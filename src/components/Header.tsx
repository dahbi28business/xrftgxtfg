import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon';
import { Link } from './Router';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Our Clients', href: '#testimonials' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 border-b border-background-200 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <img
                alt="Logo"
                className="h-10 w-auto rounded-lg"
                src="https://storage.readdy-site.link/project_files/e5693d8a-4405-47fa-b3de-37bb2260aed8/63c75019-2e17-47a6-b9eb-acc754612413_compressed_Design-sans-titre-4.webp"
              />
              <span className="text-xl font-bold font-heading text-foreground-950 tracking-tight">Fennlight</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground-600 hover:text-primary-500 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md hover:scale-[1.02] transform"
            >
              Get a Quote
            </Link>
          </nav>

          <div className="lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground-600 hover:text-primary-500 focus:outline-none transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              <Icon name={isOpen ? 'ri-close-line' : 'ri-menu-line'} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden border-t border-background-100 bg-white"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground-600 hover:text-primary-500 font-medium py-2 transition-colors duration-200 block"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium text-center block mt-3 shadow-sm"
              >
                Get a Quote
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
