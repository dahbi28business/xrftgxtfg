import { services } from '../data';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 font-heading mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-600 font-body max-w-2xl mx-auto"
          >
            We provide comprehensive web design, advanced AI chatbot integration, and automated review solutions to help your business succeed online.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="group bg-gradient-to-br from-white to-primary-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-background-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                <Icon name={service.icon} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground-950 font-heading mb-4">
                {service.title}
              </h3>
              <p className="text-foreground-600 font-body leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg hover:shadow-xl hover:scale-105 transform whitespace-nowrap"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
