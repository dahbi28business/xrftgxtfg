import { Link } from "./Router";
import Icon from "./Icon";

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p className="text-foreground-500 font-body">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 font-body text-foreground-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit websites. They are widely used to make websites work, improve page loads, or work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              2. How We Use Cookies
            </h2>
            <p>
              We use first-party cookies to facilitate key website functionalities (such as keeping track of session data or remembering details you submit in contact forms). These are essential cookies and cannot be turned off as the website would fail to operate properly without them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              3. Types of Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-background-200 text-sm">
                <thead>
                  <tr className="bg-background-100 text-foreground-950 font-bold">
                    <th className="border border-background-200 p-3 text-left">Cookie Type</th>
                    <th className="border border-background-200 p-3 text-left">Purpose</th>
                    <th className="border border-background-200 p-3 text-left">Lifespan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-background-200 p-3 font-semibold">Strictly Necessary</td>
                    <td className="border border-background-200 p-3">Maintains basic navigation security and handles form state protection.</td>
                    <td className="border border-background-200 p-3">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-background-200 p-3 font-semibold">Functionality</td>
                    <td className="border border-background-200 p-3">Remembers local user choices (such as marketing opt-in ticks or close events).</td>
                    <td className="border border-background-200 p-3">Up to 1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              4. Controlling Cookies
            </h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground-950 font-heading">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
            </p>
            <div className="bg-white p-6 rounded-xl border border-background-200 shadow-sm inline-block space-y-2">
              <p className="font-semibold text-foreground-950">Fennlight Compliance</p>
              <p className="flex items-center gap-2 text-sm">
                <Icon name="ri-mail-line" className="text-primary-500 w-4 h-4" />
                <a href="mailto:dahbi28.business@gmail.com" className="text-primary-600 hover:underline">
                  dahbi28.business@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
