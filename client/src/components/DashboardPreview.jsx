import { motion } from 'framer-motion';
import { Section, SectionHeader } from './ui/Section';

const DashboardPreview = () => {
  return (
    <Section id="dashboard-preview" className="bg-[#020617] overflow-hidden">
      <SectionHeader 
        title="Experience the ultimate intelligence platform"
        subtitle="Our interface is designed to keep you focused, organized, and constantly discovering new insights."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto mt-16 max-w-[1000px] rounded-3xl border border-[#00FFB2]/20 bg-[#020817]/80 p-2 sm:p-4 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,255,178,0.15)]"
      >
        {/* Browser Mockup Top Bar */}
        <div className="flex items-center gap-2 mb-4 px-4 pt-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-12 gap-4 h-[500px] sm:h-[600px]">
          
          {/* Sidebar */}
          <div className="col-span-3 hidden md:flex flex-col gap-4 rounded-2xl bg-black/40 p-4 border border-[#00FFB2]/10">
            <div className="flex items-center gap-3 text-[#00FFB2] font-medium mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-xs text-[#020617] font-bold shadow-[0_0_10px_rgba(0,255,178,0.5)]">SB</div>
              Second Brain
            </div>
            
            <nav className="flex flex-col gap-2 flex-1">
              {['Home', 'Notes', 'Knowledge Graph', 'AI Assistant', 'Settings'].map((item, i) => (
                <div key={i} className={`px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${i === 2 ? 'bg-[#00FFB2]/10 text-[#00FFB2] font-medium border border-[#00FFB2]/20 shadow-[inset_0_0_10px_rgba(0,255,178,0.1)]' : 'text-white/50 hover:bg-white/5 hover:text-white transition-colors'}`}>
                  <div className={`w-4 h-4 rounded-sm ${i === 2 ? 'bg-[#00FFB2] shadow-[0_0_10px_rgba(0,255,178,0.8)]' : 'bg-white/20'}`}></div>
                  {item}
                </div>
              ))}
            </nav>
            
            <div className="mt-auto h-24 rounded-xl bg-[linear-gradient(135deg,rgba(0,255,178,0.1),transparent)] border border-[#00FFB2]/20 p-4 flex flex-col justify-end">
              <h4 className="text-[#00FFB2] text-sm font-medium">Pro Plan</h4>
              <p className="text-[#00FFB2]/50 text-xs">80% storage used</p>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
            
            {/* Search Top Bar */}
            <div className="h-14 rounded-2xl bg-black/40 border border-[#00FFB2]/10 flex items-center px-4 hover:border-[#00FFB2]/30 transition-colors cursor-text group">
              <svg className="w-5 h-5 text-[#00FFB2]/50 mr-3 group-hover:text-[#00FFB2] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="text-white/40 text-sm">Ask your neural network anything...</div>
            </div>

            {/* Content Multi-panes */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              
              {/* Left Pane (Graph Viz Mockup) */}
              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-black/40 border border-[#00FFB2]/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,178,0.1),transparent_70%)] opacity-80" />
                <div className="p-4 relative z-10">
                  <h3 className="text-white font-medium text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FFB2] shadow-[0_0_8px_#00FFB2] animate-pulse"></span>
                    Semantic Connections
                  </h3>
                </div>
                {/* Fake Graph Nodes */}
                <div className="absolute inset-x-0 bottom-0 top-16 relative">
                  {[...Array(8)].map((_, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + Math.random(), duration: 0.5 }}
                      className="absolute w-12 h-12 rounded-full border border-[#00FFB2]/30 bg-[#020617]/50 backdrop-blur-md flex items-center justify-center glow-effect"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        boxShadow: `0 0 15px rgba(0,255,178,0.3)`
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00FFB2] shadow-[0_0_8px_#00FFB2]"></div>
                    </motion.div>
                  ))}
                  {/* Fake connection lines */}
                  <svg className="w-full h-full absolute inset-0 text-[#00FFB2]/20" pointerEvents="none">
                    <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="currentColor" strokeWidth="1" />
                    <line x1="50%" y1="60%" x2="80%" y2="40%" stroke="currentColor" strokeWidth="1" />
                    <line x1="50%" y1="60%" x2="30%" y2="70%" stroke="currentColor" strokeWidth="1" />
                    <line x1="80%" y1="40%" x2="70%" y2="20%" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Right Pane (Chat/Summary Mockup) */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                <div className="flex-1 rounded-2xl bg-black/40 border border-[#00FFB2]/10 p-4 flex flex-col relative overflow-hidden">
                   <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00FFB2]/50 to-transparent"></div>
                   <h3 className="text-white font-medium text-sm mb-4">Neural Assistant</h3>
                   <div className="flex-1 flex flex-col gap-3">
                     <div className="bg-white/5 border border-white/5 rounded-xl rounded-tr-sm p-3 self-end max-w-[85%] text-xs text-white/80">
                       Summarize my notes on the "Quantum Computing" project from last week.
                     </div>
                     <div className="bg-[#00FFB2]/5 border border-[#00FFB2]/20 rounded-xl rounded-tl-sm p-3 self-start max-w-[90%] text-xs text-white/80 leading-relaxed shadow-[inset_0_0_20px_rgba(0,255,178,0.05)]">
                       <span className="text-[#00FFB2] font-semibold mb-1 block">System Response</span>
                       Based on your 4 nodes, the key takeaways are: <br/><br/>
                       1. Focus on error correction algorithms.<br/>
                       2. Qubit coherence times need extending.<br/>
                       <span className="text-[#4ADE80] mt-2 block italic text-[10px] break-all">References: node_v1.txt, meeting_notes.md</span>
                     </div>
                   </div>
                </div>
                
                <div className="h-24 rounded-2xl bg-black/40 border border-[#00FFB2]/10 p-4 group hover:border-[#00FFB2]/30 transition-colors">
                  <h3 className="text-white font-medium text-sm mb-2 group-hover:text-[#00FFB2] transition-colors">Recent Memory Nodes</h3>
                  <div className="flex gap-2">
                     <div className="h-8 flex-1 rounded-lg bg-[#00FFB2]/5 border border-[#00FFB2]/10"></div>
                     <div className="h-8 flex-1 rounded-lg bg-[#00FFB2]/5 border border-[#00FFB2]/10"></div>
                  </div>
                </div>

              </div>
              
            </div>

          </div>
        </div>
        
        {/* Glow overlay bottom */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-[#00FFB2]/20 blur-[100px] pointer-events-none rounded-full" />
      </motion.div>
    </Section>
  );
};

export default DashboardPreview;
