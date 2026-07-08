import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SUBMISSIONS_FILE = path.join(process.cwd(), "submissions.json");

// Ensure submissions file exists
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
}

// API endpoint for contact form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message, marketing_consent } = req.body;

  // Basic validation
  if (!name || !email || !service) {
    return res.status(400).json({
      code: "ERROR",
      message: "Please fill in all required fields (Name, Email, and Service).",
    });
  }

  // Create submission object
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

  try {
    // 1. Save locally to submissions.json
    const fileData = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const submissions = JSON.parse(fileData);
    submissions.push(submission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    console.log(`[Contact Form] Saved submission from ${name} (${email}) locally to submissions.json`);

    // 2. Email recipient address (default to user's requested email)
    const receiverEmail = process.env.CONTACT_RECEIVER || "dahbi28.business@gmail.com";

    // 3. Attempt to send email via nodemailer
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
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
      console.log(`[Contact Form] Notification email successfully sent to ${receiverEmail}`);
    } else {
      console.warn(
        `[Contact Form] SMTP_USER and SMTP_PASS environment variables are not set. The submission was saved locally in submissions.json, but email notification to ${receiverEmail} was skipped.`
      );
    }

    // Return success to client
    return res.status(200).json({
      code: "OK",
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (error: any) {
    console.error("[Contact Form Error] Failed to process submission:", error);
    return res.status(500).json({
      code: "ERROR",
      message: "An error occurred while sending your message. Please try again later.",
    });
  }
});

// API endpoint for chatbot
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.warn("[Chatbot] GEMINI_API_KEY is not set. Responding with off-line assistance.");
      return res.json({
        reply: "- **Fennlight Overview**\n\nFennlight specializes in custom website design starting at $497, high-speed SSD web hosting at $37/month, and SEO & review generation at $197/month. If you have any questions or would like to discuss a custom digital solution, please fill out our contact form or call us directly at (646) 631-1625!"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are Fennlight's official AI Customer Success Assistant. 
Fennlight is a premium digital agency specializing in custom web design, high-speed web hosting, local SEO/reviews optimization, and custom AI chatbot development.

Here are the official facts about Fennlight:
- Phone: (646) 631-1625
- Email: dahbi28.business@gmail.com
- Contact Form: Users can submit a message on the contact form under the "#contact" section.

Fennlight's Services & Pricing details:
1. Website Design: Custom UI/UX design, mobile responsive, SEO-optimized structure, starting at $497 per project (includes up to 5 pages, 2 revision rounds, and launch support).
2. Hosting: SSD NVMe storage, free SSL certificate, daily automated backups, 99.9% uptime, worldwide CDN, 24/7 server monitoring, starting at $37/month.
3. Local SEO & Reviews: Google Business optimization, review generation strategy, local citation building, monthly ranking reports, competitor analysis, starting at $197/month.
4. AI Chatbots: Custom AI training, lead capture automation, multi-language support, CRM integration ready, analytics dashboard, starting at $397/month.
5. Maintenance: Regular updates, security scans, uptime monitoring 24/7, content updates, monthly backups, priority support queue.

Process Steps:
1. Discovery Call: Discussing goals, target audience, and preferences.
2. Design & Planning: Creating wireframes and mockups.
3. Development: Building the fast, secure, mobile-responsive site.
4. Launch & Support: Going live, followed by ongoing optimization.

Core Values / Key Features:
- Load times under 3 seconds (Lightning-Fast Performance)
- Fully bespoke, custom-made designs (not generic templates)
- Enterprise-grade hosting security (SSL certificates and robust infrastructure)
- Expert dedicated team of designers, developers, and marketers

GUIDELINES FOR YOUR BEHAVIOR & OUTPUT FORMATTING (CRITICAL):
1. **Response Start Requirement**: You MUST start every single response with a minus sign, a single space, and a bold/large title summarizing the topic of the response, followed by two newlines.
   Format: "- **[Category or Subject Title]**\n\n[Body text starts here]"
   Example:
   "- **Web Design Pricing**\n\nOur custom-built web design packages start at $497, which includes professional UI/UX design..."

2. **Clean Text Style**: Do NOT write messy asterisks, starrs, hashes, or unnecessary list markers inside the body text. Keep the body text in regular, clean, paragraph-based format. Minimize lists and bullet points. Avoid cluttered markdown symbols. Keep formatting sleek and readable.

3. **Emoji Control**: Use emojis ONLY if strictly necessary to explain better, and do so very sparingly (at most 1 or 2 total in the entire message). Never use them excessively.

4. **Business Limitation**: You must ONLY answer questions that are relevant to Fennlight, its services, pricing, process, contact information, and business.
- If a user asks a question about general programming, homework, random topics, recipes, math problems, jokes, or other non-business questions, you MUST politely decline to answer, stating that you are Fennlight's assistant and are here only to help with Fennlight's web design, hosting, and digital growth services. Keep the redirection extremely polite and helpful.

5. **Action-oriented**: Be concise, professional, friendly, and action-oriented. Always encourage the user to fill out the contact form or call/email us for a custom quote or free discovery session.`;

    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm sorry, I'm having trouble formulating a response right now. Please try again or contact us directly at dahbi28.business@gmail.com.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("[Chatbot Error] Failed to generate response from Gemini:", error);
    return res.status(500).json({
      error: "Failed to generate response. Please try again.",
      details: error.message
    });
  }
});

// Dynamic Robots.txt handler
app.get("/robots.txt", (req, res) => {
  const domain = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml`);
});

// Dynamic Sitemap.xml handler
app.get("/sitemap.xml", (req, res) => {
  const domain = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
  const today = new Date().toISOString().split("T")[0];

  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${domain}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${domain}/cookie-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`);
});

// Vite middleware configuration for development vs production
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Server] Vite middleware mounted for development");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Server] Serving static built files in production mode");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
