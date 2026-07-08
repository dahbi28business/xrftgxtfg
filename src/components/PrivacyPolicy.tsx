import { Link } from "./Router";
import Icon from "./Icon";

export default function PrivacyPolicy() {
  const lastUpdated = "July 7, 2026";

  return (
    <div className="bg-background-50 py-16 lg:py-24 font-sans text-foreground-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs / Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <Icon name="ri-arrow-left-line" className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-background-200 pb-8 mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-foreground-950 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-foreground-500 font-body">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 font-body text-foreground-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Fennlight</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the privacy practices of our website and explains how we collect, use, disclose, and safeguard your information when you visit or submit forms on our platform.
            </p>
            <p>
              Please read this privacy notice carefully. If you do not agree with the terms of this privacy policy, please do not access or use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us when you fill out contact forms, request a quote, or correspond with us. This information may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Your full name, email address, phone number, and physical business details.</li>
              <li><strong>Business Information:</strong> The type of services or projects you are interested in and any project specifications or messages you provide.</li>
              <li><strong>Marketing Consent:</strong> Preferences regarding receiving informational emails and newsletter updates.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              3. How We Use Your Information
            </h2>
            <p>
              We process your personal details to achieve legitimate business goals, comply with our legal obligations, and provide high-quality services. Specifically, we use your details to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and fulfill requests for service quotes.</li>
              <li>Communicate project updates, invoices, and service-related messages.</li>
              <li>Improve website security, prevent spam, and maintain local logs of submissions.</li>
              <li>Deliver marketing emails or promotional communications, provided you have explicitly consented to receive them.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We value your trust. We do not sell, rent, or trade your personal information with third parties for commercial gains. Your information is only shared in the following specific circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>To Comply with Laws:</strong> Where we are legally required to do so to comply with applicable law, governmental requests, or judicial proceedings.</li>
              <li><strong>With Trusted Service Providers:</strong> We use select, secure, and audited external providers (like email delivery networks) to handle the delivery of emails or run the hosting environment. These partners are restricted from using your data for any other purpose.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              5. Data Security & Storage
            </h2>
            <p>
              We implement comprehensive physical, administrative, and technological security controls designed to safeguard your personal details against unauthorized access, loss, or manipulation. Form details are securely processed and held in encrypted formats.
            </p>
            <p>
              While we strive to use industry-standard practices to protect your data, please remember that no transmission over the internet or electronic storage method can be guaranteed 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              6. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have specific privacy rights regarding your personal data. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to request access, updates, or correction of your details.</li>
              <li>The right to request deletion of your personal details stored in our database.</li>
              <li>The right to opt-out of promotional marketing campaigns at any time by clicking "unsubscribe" or contacting us directly.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              7. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please reach out to us at:
            </p>
            <div className="bg-white p-6 rounded-xl border border-background-200 shadow-sm inline-block space-y-2">
              <p className="font-semibold text-foreground-950">Fennlight Support</p>
              <p className="flex items-center gap-2 text-sm">
                <Icon name="ri-mail-line" className="text-primary-500 w-4 h-4" />
                <a href="mailto:dahbi28.business@gmail.com" className="text-primary-600 hover:underline">
                  dahbi28.business@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Icon name="ri-phone-line" className="text-primary-500 w-4 h-4" />
                <a href="tel:+16466311625" className="text-primary-600 hover:underline">
                  (646) 631-1625
                </a>
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
