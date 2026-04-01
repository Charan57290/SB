import { motion } from 'framer-motion';
import { cn } from './Button';

export const Section = ({
  id,
  className,
  children,
  containerClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
}) => {
  return (
    <section id={id} className={cn('relative py-24 sm:py-32', className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={containerClass}
      >
        {children}
      </motion.div>
    </section>
  );
};

export const SectionHeader = ({ title, subtitle, className }) => {
  return (
    <div className={cn('max-w-3xl mx-auto text-center mb-16 sm:mb-24', className)}>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#9ca3af]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
