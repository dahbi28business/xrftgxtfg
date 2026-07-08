import { GoogleGenAI } from "@google/genai";

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
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.warn("[Chatbot Serverless] GEMINI_API_KEY is not set.");
      return new Response(
        JSON.stringify({
          reply: "- **Fennlight Overview**\n\nFennlight specializes in custom website design starting at $497, high-speed SSD web hosting at $37/month, and SEO & review generation at $197/month. If you have any questions or would like to discuss a custom digital solution, please fill out our contact form or call us directly at (646) 631-1625!",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
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
          parts: [{ text: msg.text }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply =
      response.text ||
      "I'm sorry, I'm having trouble formulating a response right now. Please try again or contact us directly at dahbi28.business@gmail.com.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("[Chatbot Serverless Error]", err);
    return new Response(
      JSON.stringify({
        error: "Failed to generate response. Please try again.",
        details: err.message,
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
  path: "/api/chat"
};
