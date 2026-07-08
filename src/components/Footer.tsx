import Icon from './Icon';
import { Link } from './Router';

export default function Footer() {
  const socialLinks = [
    { icon: 'ri-facebook-fill', href: '#' },
    { icon: 'ri-twitter-x-fill', href: '#' },
    { icon: 'ri-linkedin-fill', href: '#' },
    { icon: 'ri-instagram-line', href: '#' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Our Clients', href: '#testimonials' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="bg-foreground-900 text-white border-t border-foreground-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Intro Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                alt="Logo"
                className="h-12 w-auto rounded-lg"
                src="https://storage.readdy-site.link/project_files/e5693d8a-4405-47fa-b3de-37bb2260aed8/ebbb2443-387f-4ae5-aab1-909a66b67d0a_compressed_Design-sans-titre-5.webp"
              />
              <span className="text-2xl font-bold font-heading text-white tracking-tight">Fennlight</span>
            </Link>
            <p className="text-foreground-300 font-body leading-relaxed mb-6 max-w-md text-sm">
              We create stunning, conversion-optimized websites that help businesses succeed online. From design to development, we're your trusted partner for digital success.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors duration-200"
                  aria-label={`Link to social profile ${social.icon}`}
                >
                  <Icon name={social.icon} className="text-white w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold font-heading mb-6 border-b border-foreground-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground-300 hover:text-accent-500 transition-colors duration-200 font-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-lg font-semibold font-heading mb-6 border-b border-foreground-800 pb-2">
              Get in Touch
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Icon name="ri-phone-line" className="text-accent-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-foreground-300 font-body">(646) 631-1625</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="ri-mail-line" className="text-accent-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-foreground-300 font-body">dahbi28.business@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="ri-map-pin-line" className="text-accent-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-foreground-300 font-body leading-relaxed">
                    Morocco
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright notice row */}
        <div className="border-t border-foreground-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-foreground-400 font-body mb-4 md:mb-0">
            © 2025 Fennlight. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-foreground-400 hover:text-accent-500 transition-colors duration-200 font-body">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-foreground-400 hover:text-accent-500 transition-colors duration-200 font-body">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-foreground-400 hover:text-accent-500 transition-colors duration-200 font-body">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
