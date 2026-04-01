import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Button } from './ui/Button';

const nodes = [
  { x: 60, y: 70, r: 5 },
  { x: 120, y: 40, r: 4 },
  { x: 180, y: 80, r: 6 },
  { x: 250, y: 55, r: 5 },
  { x: 305, y: 95, r: 4 },
  { x: 90, y: 140, r: 6 },
  { x: 160, y: 160, r: 4 },
  { x: 230, y: 145, r: 6 },
  { x: 310, y: 170, r: 5 },
  { x: 70, y: 220, r: 4 },
  { x: 140, y: 245, r: 6 },
  { x: 210, y: 215, r: 4 },
  { x: 290, y: 245, r: 6 },
  { x: 340, y: 205, r: 4 },
];

const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [8, 13],
  [4, 8],
  [2, 7],
  [7, 12],
];

const KnowledgeNetwork = () => {
  return (
    <Section id="knowledge-network" className="bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-[240px] bg-white/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-gradient"
          >
            Your Knowledge Network
          </motion.h2>
          <p className="mt-5 text-lg text-[#9ca3af] leading-relaxed max-w-xl">
            Second Brain transforms scattered information into a connected knowledge graph powered by artificial
            intelligence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button variant="solid" size="lg">
              See Demo
            </Button>
            <Button variant="outline" size="lg" className="border-white/15 hover:border-white/50 hover:bg-white/10">
              Learn More
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg">
            {[
              { k: 'Nodes', v: 'Notes + docs + chats' },
              { k: 'Links', v: 'Auto semantic connections' },
              { k: 'Signals', v: 'Realtime relevance scoring' },
              { k: 'Insights', v: 'Cited AI answers' },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 hover:border-white/30 hover:bg-white/5 transition-colors"
              >
                <div className="text-xs tracking-[0.2em] uppercase text-white/50">{item.k}</div>
                <div className="mt-2 text-sm text-white/90">{item.v}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-white/5 blur-[80px] rounded-[3rem] pointer-events-none" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_70px_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)] pointer-events-none" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                  <div className="text-sm font-medium text-white/90">Neural Knowledge Graph</div>
                </div>
                <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/40">Live topology</div>
              </div>

              <div className="mt-6 relative h-[320px] sm:h-[360px]">
                <svg viewBox="0 0 380 280" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
                      <stop offset="40%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                    </linearGradient>
                    <filter id="nodeGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {links.map(([a, b], i) => (
                    <motion.line
                      key={i}
                      x1={nodes[a].x}
                      y1={nodes[a].y}
                      x2={nodes[b].x}
                      y2={nodes[b].y}
                      stroke="url(#edge)"
                      strokeWidth="1.2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.02 }}
                    />
                  ))}

                  {nodes.map((n, i) => (
                    <motion.g key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 + i * 0.02 }}>
                      <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill="rgba(255,255,255,0.05)" />
                      <circle cx={n.x} cy={n.y} r={n.r} fill="white" filter="url(#nodeGlow)" />
                    </motion.g>
                  ))}
                </svg>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 left-6 rounded-2xl border border-white/5 bg-black/30 backdrop-blur-xl px-4 py-3">
                    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">Insight</div>
                    <div className="mt-1 text-sm text-white/85">
                      “Project notes” ↔ “Research” linked
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">Signal</div>
                    <div className="mt-1 text-sm text-white/85">
                      Relevance score rising
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] opacity-15 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default KnowledgeNetwork;

