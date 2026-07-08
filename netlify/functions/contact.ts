import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ code: "ERROR", message: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, message, marketing_consent } = body;

    if (!name || !email || !service) {
      return new Response(
        JSON.stringify({
          code: "ERROR",
          message: "Please fill in all required fields (Name, Email, and Service).",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "N/A",
      service,
      message: message || "N/A",
      marketing_consent: !!marketing_consent,
      createdAt: new Date().toISOString(),
    };

    // 1. Attempt local file save (might fail or be ephemeral on serverless, but let's try-catch)
    try {
      const submissionsDir = "/tmp";
      const submissionsFile = path.join(submissionsDir, "submissions.json");
      let currentSubmissions = [];
      if (fs.existsSync(submissionsFile)) {
        currentSubmissions = JSON.parse(fs.readFileSync(submissionsFile, "utf-8"));
      }
      currentSubmissions.push(submission);
      fs.writeFileSync(submissionsFile, JSON.stringify(currentSubmissions, null, 2), "utf-8");
      console.log("[Contact Serverless] Logged submission to temp path");
    } catch (fsErr) {
      console.warn("[Contact Serverless] Local fs save skipped or unavailable in serverless environment:", fsErr);
    }

    // 2. Email Notification
    const receiverEmail = process.env.CONTACT_RECEIVER || "dahbi28.business@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name} (via Fennlight Form)" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `New Fennlight Contact Submission from ${name}`,
        text: `You have received a new contact submission from your website.

Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "N/A"}
- Service of Interest: ${service}
- Marketing Consent: ${marketing_consent ? "Yes" : "No"}

Message:
${message || "No message provided."}
`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">New Contact Submission</h2>
            <p style="font-size: 16px; color: #334155; line-height: 1.5;">You have received a new business inquiry from <strong>Fennlight</strong>.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 150px;">Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Phone</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Service Selected</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><span style="background-color: #eff6ff; color: #1e40af; padding: 4px 8px; border-radius: 6px; font-size: 14px;">${service}</span></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Marketing Consent</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${marketing_consent ? "✅ Subscribed" : "❌ No"}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9; margin-top: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #475569;">Message:</h4>
              <p style="margin: 0; color: #0f172a; white-space: pre-wrap; line-height: 1.5; font-size: 14px;">${message || "No message provided."}</p>
            </div>
            
            <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This email was sent automatically from the Fennlight Contact Form system.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Contact Serverless] Notification email successfully sent to ${receiverEmail}`);
    } else {
      console.warn("[Contact Serverless] SMTP credentials not set. Saving skipped.");
    }

    return new Response(
      JSON.stringify({
        code: "OK",
        message: "Thank you! Your message has been sent successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    console.error("[Contact Serverless Error]", err);
    return new Response(
      JSON.stringify({
        code: "ERROR",
        message: "An error occurred while sending your message. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

export const config = {
  path: "/api/contact"
};
