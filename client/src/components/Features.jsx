import { motion } from 'framer-motion';
import { Section, SectionHeader } from './ui/Section';

const features = [
  {
    title: 'AI Persona Engine',
    description: 'Create and deploy collectives of specialized AI personas that understand your unique knowledge base.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2M7 4h10M7 20h10M5 8v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
      </svg>
    ),
    gradient: 'from-white/10 to-gray-400/5',
  },
  {
    title: 'Rapid Experimentation',
    description: 'Run simulations and test hypotheses in minutes, leveraging the collective power of your AI personas.',
    icon: (
      <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-gray-400/10 to-white/5',
  },
  {
    title: 'Neural Link Architecture',
    description: 'Automatic semantic mapping that connects disparate data points into a cohesive cognitive network.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-white/10 to-gray-200/5',
  },
  {
    title: 'Infinite Memory Context',
    description: 'Personas that never forget. Every document, note, and chat is indexed for persistent long-term retrieval.',
    icon: (
      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    gradient: 'from-gray-400/10 to-gray-600/5',
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card p-8 group relative overflow-hidden"
    >
      {/* Hover Background Glow */}
      <div className={`absolute -inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0 pointer-events-none`} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-shadow">
          {feature.icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
          {feature.title}
        </h3>
        
        <p className="text-[#9ca3af] leading-relaxed flex-1">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <Section id="features" className="bg-black relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <SectionHeader 
        title="Engineered for Discovery"
        subtitle="Unleash the power of collective AI personas to test, simulate, and discover insights in record time."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto relative z-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Features;
