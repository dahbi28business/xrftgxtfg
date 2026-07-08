import { pricingPlans, pricingColors } from '../data';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 font-heading mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-600 font-body max-w-2xl mx-auto"
          >
            No hidden fees. Choose the perfect plan for your business needs. All plans include standard set-up support.
          </motion.p>
        </div>

        {/* 5 column layout, responsive to flex/grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => {
            const colors = pricingColors[plan.color];
            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-300 flex flex-col p-6 cursor-pointer ${
                  plan.popular
                    ? 'border-secondary-500 shadow-xl scale-[1.02] z-10'
                    : 'border-background-200 hover:border-background-400 hover:shadow-md'
                }`}
              >
                {/* Popular Ribbon/Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-secondary-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
                    Most Popular
                  </div>
                )}

                {/* Card Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center`}>
                    <Icon name={plan.icon} className="text-xl text-white" />
                  </div>
                </div>

                {/* Card Header Info */}
                <h3 className="text-xl font-bold text-foreground-950 font-heading mb-1">
                  {plan.title}
                </h3>
                <p className="text-xs text-foreground-500 font-body leading-relaxed mb-4 h-10 overflow-hidden">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground-950 font-heading">
                    {plan.price}
                  </span>
                  <span className="text-xs text-foreground-500 block">
                    {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-xs text-foreground-600 font-body">
                      <div className={`w-4 h-4 ${colors.checkBg} rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0`}>
                        <Icon name="ri-check-line" className={`text-[10px] ${colors.checkText}`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <a
                    href="#contact"
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center block ${
                      plan.popular
                        ? 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-md'
                        : `bg-gradient-to-r ${colors.bg} text-white hover:opacity-90`
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
