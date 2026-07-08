import { motion } from 'motion/react';
import Icon from './Icon';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-primary-100/70 to-white overflow-hidden">
      {/* Decorative Blurry Floating Circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-48 right-10 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl animation-delay-2000 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl animation-delay-4000 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Left Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground-950 font-heading leading-tight mb-6"
              variants={itemVariants}
            >
              Build Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 block mt-2">
                Landing Page
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-foreground-600 font-body mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Create stunning, conversion-optimized websites that turn visitors into customers. Professional designs,
              integrated AI chatbots, automated reviews, and mobile-responsive layouts – all in one powerful platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <a
                href="#contact"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg hover:shadow-xl hover:scale-105 transform whitespace-nowrap text-center shadow-md"
              >
                Get Started Today
              </a>
              <a
                href="#services"
                className="bg-background-100 text-primary-500 px-8 py-4 rounded-lg hover:bg-background-200 transition-all duration-300 font-semibold text-lg hover:shadow-lg border border-background-200 whitespace-nowrap text-center"
              >
                View Services
              </a>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-foreground-600"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Icon name="ri-star-fill" className="text-accent-500 w-5 h-5 fill-current" />
                <span className="font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="ri-shield-check-line" className="text-secondary-500 w-5 h-5" />
                <span className="font-medium">Fully Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="ri-smartphone-line" className="text-primary-500 w-5 h-5" />
                <span className="font-medium">Mobile Optimized</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Image Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-[1.03] transition-transform duration-300">
              <img
                alt="Professional web designer working on modern UI design interface"
                className="w-full h-auto rounded-xl"
                referrerPolicy="no-referrer"
                src="https://storage.readdy-site.link/project_files/e5693d8a-4405-47fa-b3de-37bb2260aed8/f7f8d30d-5496-496e-bd6f-7a092feae569_compressed_public.webp"
              />
            </div>
            {/* Overlay float elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500 rounded-full opacity-80 animate-float" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent-400 rounded-full opacity-60 animate-float animation-delay-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
