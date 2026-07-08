import { Link } from "./Router";
import Icon from "./Icon";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-foreground-500 font-body">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 font-body text-foreground-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or using the website or services of <strong>Fennlight</strong> ("we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms") and all applicable local, national, and international laws.
            </p>
            <p>
              If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              2. Description of Services
            </h2>
            <p>
              Fennlight provides professional website design, web development, digital branding, conversion optimization, and related online marketing services. All services rendered or described on this website are subject to separate custom written statements of work (SOW) or master service agreements (MSA) signed by both parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              3. User Conduct and Forms Submissions
            </h2>
            <p>
              By filling out our contact, estimation, or pricing forms, you guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All information provided is true, accurate, current, and complete.</li>
              <li>You will not submit any material that is offensive, harmful, defamatory, or in violation of intellectual property laws.</li>
              <li>You will not use automated scripts, scrapers, or bots to crawl or submit entries to our server endpoints.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              4. Intellectual Property
            </h2>
            <p>
              The intellectual property rights, trademarks, layout, graphics, content, code, and design on this website belong exclusively to Fennlight. No portion of this website may be copied, modified, distributed, or sold without our prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The materials and info on our website are provided on an "as is" and "as available" basis. Fennlight makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              6. Limitations of Liability
            </h2>
            <p>
              In no event shall Fennlight or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Fennlight's website, even if Fennlight or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              7. Revisions and Errata
            </h2>
            <p>
              The materials appearing on Fennlight's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              8. Modifications to Terms
            </h2>
            <p>
              We reserve the right to revise or update these Terms of Service at any time without prior notice. By using this website, you agree to be bound by the then-current version of these Terms of Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              9. Contact Information
            </h2>
            <p>
              If you have any questions or clarifications regarding these Terms, please contact us:
            </p>
            <div className="bg-white p-6 rounded-xl border border-background-200 shadow-sm inline-block space-y-2">
              <p className="font-semibold text-foreground-950">Fennlight Legal</p>
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
