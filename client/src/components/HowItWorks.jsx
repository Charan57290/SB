import { motion } from 'framer-motion';
import { Section, SectionHeader } from './ui/Section';

const steps = [
  {
    title: 'Deploy Memory Nodes',
    description: 'Upload your documents, notes, and links to establish the dense knowledge foundation of your Second Brain.',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8M8 11h8M8 15h5M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    )
  },
  {
    title: 'Activate AI Personas',
    description: 'Specialized AI entities automatically link and analyze your nodes with superhuman semantic precision.',
    icon: (
      <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7a2 2 0 114 0 2 2 0 01-4 0zm10 0a2 2 0 114 0 2 2 0 01-4 0zM7 17a2 2 0 114 0 2 2 0 01-4 0zm10 0a2 2 0 114 0 2 2 0 01-4 0zM9 7h6M9 17h6M9 9l6 6M15 9l-6 6" />
      </svg>
    )
  },
  {
    title: 'Run Experiments',
    description: 'Query your collective intelligence to run simulations, test ideas, and discover deeply cited insights in seconds.',
    icon: (
      <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const HowItWorks = () => {
  return (
    <Section id="how-it-works" className="bg-black relative border-t border-white/5 overflow-hidden">
      
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0,transparent_50%)] pointer-events-none"></div>

      <SectionHeader 
        title="Collective Intelligence Cycle"
        subtitle="A streamlined workflow that transforms static data into dynamic, experimental intelligence."
      />

      <div className="relative max-w-5xl mx-auto mt-20">
        
        {/* Connecting Background Line (Desktop) */}
        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {/* Animated Dash Line overlays */}
        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] overflow-hidden">
           <motion.div 
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center relative group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)] transition-shadow">
                  {step.icon}
                </div>
                <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-full h-full rounded-[2rem] bg-gradient-to-tr from-white/5 via-gray-400/5 to-gray-600/5 blur-2xl" />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9ca3af] max-w-sm">
                {step.description}
              </p>

              {/* Connector dot (mobile) */}
              {index !== steps.length - 1 && (
                <div className="md:hidden mt-10 h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Add global keyframes for dash animation if not in tailwind config */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -400;
          }
        }
      `}</style>
    </Section>
  );
};

export default HowItWorks;
