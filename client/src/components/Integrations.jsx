import { motion } from 'framer-motion';
import { Section } from './ui/Section';

const integrations = [
  { name: 'Notion', bg: 'bg-white/5', accent: 'text-white' },
  { name: 'Google Drive', bg: 'bg-white/5', accent: 'text-white' },
  { name: 'Slack', bg: 'bg-white/5', accent: 'text-white' },
  { name: 'GitHub', bg: 'bg-white/5', accent: 'text-white' },
  { name: 'Obsidian', bg: 'bg-white/5', accent: 'text-white' },
];

const Integrations = () => {
  return (
    <Section id="integrations" className="bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-gradient">
            Works With Your Favorite Tools
          </h2>
          <p className="mt-4 text-lg text-[#9ca3af] max-w-3xl mx-auto">
            Seamlessly connect Second Brain with the apps you already use to capture and sync knowledge.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {integrations.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-5 flex items-center justify-center gap-3 hover:border-white/40 hover:bg-white/5 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)] transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${app.bg} border border-white/10 flex items-center justify-center shadow-[inset_0_0_12px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_18px_rgba(255,255,255,0.1)] transition-shadow`}>
                <span className={`text-sm font-black ${app.accent}`}>
                  {app.name.charAt(0)}
                </span>
              </div>
              <span className="text-white/90 font-medium">{app.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Integrations;
