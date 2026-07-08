import { useState, useRef, useCallback, TouchEvent } from 'react';
import { testimonials } from '../data';
import Icon from './Icon';
import { motion } from 'motion/react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startX = useRef(0);
  const currentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.targetTouches[0].clientX;
    currentX.current = e.targetTouches[0].clientX;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    currentX.current = e.targetTouches[0].clientX;
    const diff = currentX.current - startX.current;
    setDragOffset(diff);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const diff = currentX.current - startX.current;
    
    // Threshold of 50px to trigger next/prev slide
    if (diff < -50 && currentIndex < testimonials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (diff > 50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  }, [currentIndex]);

  const getCarouselStyle = () => {
    if (!containerRef.current) return {};
    const width = containerRef.current.offsetWidth;
    const translation = -(currentIndex * width) + dragOffset;
    return {
      transform: `translateX(${translation}px)`,
      transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-background-100 to-background-50 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-accent-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 font-heading mb-4"
          >
            Loved by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 ml-2">
              Our Clients
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-600 font-body max-w-2xl mx-auto"
          >
            Real results from real businesses. Here is what our partners say about working with us.
          </motion.p>
        </div>

        {/* Desktop View: 3-column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-background-200/60 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <Icon name="ri-star-fill" className="text-lg text-accent-500 fill-current" />
                    </span>
                  ))}
                </div>
                {/* Quote text */}
                <p className="text-foreground-700 font-body leading-relaxed mb-8 text-base italic">
                  “{testimonial.quote}”
                </p>
              </div>
              
              {/* Client metadata */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-background-100">
                <img
                  alt={`${testimonial.name} headshot`}
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-primary-200"
                  referrerPolicy="no-referrer"
                  src={testimonial.avatar}
                />
                <div>
                  <h4 className="text-foreground-950 font-semibold font-heading text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-foreground-500 font-body text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet View: Touch Draggable Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden touch-pan-y" ref={containerRef}>
            <div
              className="flex"
              style={getCarouselStyle()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-1" style={{ minWidth: '100%' }}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-background-200/60 mx-2">
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          <Icon name="ri-star-fill" className="text-lg text-accent-500 fill-current" />
                        </span>
                      ))}
                    </div>
                    <p className="text-foreground-700 font-body leading-relaxed mb-8 text-base italic">
                      “{testimonial.quote}”
                    </p>
                    <div className="flex items-center gap-4 border-t border-background-100 pt-4">
                      <img
                        alt={`${testimonial.name} headshot`}
                        className="w-14 h-14 rounded-full object-cover object-top border-2 border-primary-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                        src={testimonial.avatar}
                      />
                      <div>
                        <h4 className="text-foreground-950 font-semibold font-heading text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-foreground-500 font-body text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bullet indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary-500 w-8' : 'bg-background-300 hover:bg-background-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentIndex((idx) => Math.max(idx - 1, 0))}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-background-200 text-foreground-700 hover:bg-background-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous testimonial"
            >
              <Icon name="ri-arrow-left-s-line" className="text-lg" />
            </button>
            <button
              onClick={() => setCurrentIndex((idx) => Math.min(idx + 1, testimonials.length - 1))}
              disabled={currentIndex === testimonials.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-background-200 text-foreground-700 hover:bg-background-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next testimonial"
            >
              <Icon name="ri-arrow-right-s-line" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Trust factors bottom strip */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-foreground-500">
            <Icon name="ri-verified-badge-fill" className="text-primary-500 w-6 h-6" />
            <span className="font-body font-medium text-sm">100% Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-foreground-500">
            <Icon name="ri-customer-service-2-line" className="text-secondary-500 w-6 h-6" />
            <span className="font-body font-medium text-sm">500+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2 text-foreground-500">
            <Icon name="ri-trophy-line" className="text-accent-500 w-6 h-6" />
            <span className="font-body font-medium text-sm">Top-Rated Agency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
