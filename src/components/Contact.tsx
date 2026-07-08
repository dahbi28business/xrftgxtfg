import { useState, FormEvent } from 'react';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot spam field check
    if (formData.get('website_alt')?.toString().trim()) {
      setFormState('success');
      form.reset();
      return;
    }
    
    formData.delete('website_alt');

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
      marketing_consent: !!formData.get('marketing_consent'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data?.code === 'OK') {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
        setErrorMessage(data?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const trustPoints = [
    'Free consultation and project estimate',
    'Custom design tailored to your brand',
    'Mobile-responsive and SEO optimized',
    'Ongoing support and maintenance',
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-foreground-900 to-primary-600 relative overflow-hidden">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-500 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left text-white"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-6">
              Ready to Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-secondary-400 block mt-2">
                Online Presence?
              </span>
            </h2>
            <p className="text-lg text-foreground-300 font-body mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get a free consultation and discover how our expert team can help you create a website that drives real business results.
            </p>

            {/* Check Trust Points */}
            <div className="space-y-4 mb-8 max-w-md mx-auto lg:mx-0">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ri-check-fill" className="text-secondary-400 text-sm" />
                  </div>
                  <span className="font-body text-sm text-foreground-200">{point}</span>
                </div>
              ))}
            </div>

            {/* Instant Contact details */}
            <div className="space-y-4 mb-8 max-w-md mx-auto lg:mx-0 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Icon name="ri-phone-line" className="text-accent-500 w-5 h-5" />
                <span className="font-body text-foreground-200 text-sm">Call us: (646) 631-1625</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Icon name="ri-mail-line" className="text-accent-500 w-5 h-5" />
                <span className="font-body text-foreground-200 text-sm">Email: dahbi28.business@gmail.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+16466311625"
                className="bg-accent-500 text-foreground-950 px-8 py-4 rounded-lg hover:bg-accent-400 transition-all duration-300 font-semibold text-base hover:shadow-xl hover:scale-105 transform whitespace-nowrap text-center shadow-md"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+16466311625"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-foreground-950 transition-all duration-300 font-semibold text-base whitespace-nowrap text-center"
              >
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Form container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
          >
            <h3 className="text-2xl font-semibold text-white font-heading mb-6 text-center">
              Get Your Free Quote
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <input
                  id="form-name"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/95 border border-background-200 text-foreground-950 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 text-sm font-body"
                  name="name"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  id="form-email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/95 border border-background-200 text-foreground-950 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 text-sm font-body"
                  type="email"
                  name="email"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  id="form-phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-white/95 border border-background-200 text-foreground-950 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 text-sm font-body"
                  type="tel"
                  name="phone"
                />
              </div>

              {/* Service Selector */}
              <div>
                <select
                  id="form-service"
                  name="service"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/95 border border-background-200 text-foreground-950 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 text-sm font-body"
                >
                  <option value="">Select Service</option>
                  <option value="website-design">Website Design</option>
                  <option value="mobile-optimization">Mobile Optimization</option>
                  <option value="seo-optimization">SEO Optimization</option>
                  <option value="performance-optimization">Performance Optimization</option>
                  <option value="custom-ai-agent">Custom AI Agent (ChatBot)</option>
                  <option value="automated-reviews">Automated Reviews Collector</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="form-message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-white/95 border border-background-200 text-foreground-950 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 resize-none text-sm font-body"
                />
              </div>

              {/* Marketing Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="marketing_consent"
                  id="marketing_consent"
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-accent-500 focus:ring-accent-500 focus:ring-2 cursor-pointer"
                />
                <label htmlFor="marketing_consent" className="text-white/80 text-xs font-body cursor-pointer select-none leading-relaxed">
                  I agree to receive marketing emails and updates about new services, tips, and special offers.
                </label>
              </div>

              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  readOnly
                  name="website_alt"
                  id="website_alt"
                />
              </div>

              {/* Form submit response alerts */}
              {formState === 'success' && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-sm font-medium border border-green-200">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {formState === 'error' && (
                <div className="bg-red-100/90 text-red-900 px-4 py-3 rounded-lg text-sm font-medium border border-red-200">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}

              {/* Submit button */}
              <button
                id="form-submit-button"
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-accent-500 text-foreground-950 px-6 py-3.5 rounded-lg hover:bg-accent-400 transition-all duration-300 font-semibold text-base hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
