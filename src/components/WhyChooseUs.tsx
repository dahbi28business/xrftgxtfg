import { chooseFeatures } from '../data';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-br from-primary-50/50 to-secondary-100/30 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Block (order-2 on desktop, first on mobile visually but order-2 in layout) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-[1.03] transition-transform duration-300">
              <img
                alt="Creative digital agency team collaborating in modern office"
                className="w-full h-auto rounded-xl"
                src="https://storage.readdy-site.link/project_files/e5693d8a-4405-47fa-b3de-37bb2260aed8/a61cd518-83c3-4905-b4b6-22bb45ff6c14_compressed_public-1.webp"
              />
            </div>
            {/* Floating Projects Counter Badge */}
            <div className="absolute -top-6 -right-6 bg-accent-500 text-white rounded-full w-24 h-24 flex items-center justify-center font-bold text-sm shadow-lg animate-float">
              <div className="text-center">
                <div className="text-lg font-heading">100+</div>
                <div className="text-[10px] uppercase font-label">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Text Content Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 font-heading mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 block mt-2">
                Our Platform?
              </span>
            </h2>
            <p className="text-lg text-foreground-600 font-body mb-8 leading-relaxed">
              We combine cutting-edge technology—including intelligent AI chatbots and automated review systems—with proven design principles to deliver websites that not only look amazing but also drive real business results.
            </p>

            <div className="space-y-6">
              {chooseFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon name={feature.icon} className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground-950 font-heading mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-foreground-600 font-body text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#about"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg hover:shadow-xl hover:scale-105 transform inline-block whitespace-nowrap"
              >
                Learn More About Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
