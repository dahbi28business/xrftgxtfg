import { processSteps } from '../data';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function HowItWorks() {
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 font-heading mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-600 font-body max-w-2xl mx-auto"
          >
            Our streamlined process ensures you get a professional website that drives results, from concept to launch.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group text-center bg-background-50/50 rounded-2xl p-6 border border-background-100/70 hover:shadow-md transition-shadow"
              >
                {/* Step Circle with Icon */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon name={step.icon} className="text-2xl text-white" />
                </div>
                {/* Step Number Bubble */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-background-100 rounded-full flex items-center justify-center text-sm font-bold text-foreground-700 border border-background-200 z-20">
                  {step.number}
                </div>
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-foreground-950 font-heading mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground-600 font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Development process workflow image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-300 border border-background-200">
            <img
              alt="Web development process workflow visualization"
              className="w-full max-w-2xl h-auto rounded-xl mx-auto"
              src="https://storage.readdy-site.link/project_files/e5693d8a-4405-47fa-b3de-37bb2260aed8/2d9a1a25-de75-4e45-91ef-fa8152a73500_compressed_publicContain.webp"
            />
          </div>
        </motion.div>

        {/* Call to action at the bottom of the section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 p-8 sm:p-12 rounded-2xl border border-background-200 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground-950 font-heading mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-foreground-600 font-body mb-6 max-w-xl mx-auto">
            Let's discuss your project and create something amazing together.
          </p>
          <a
            href="#contact"
            className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg hover:shadow-xl hover:scale-105 transform inline-block whitespace-nowrap"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
