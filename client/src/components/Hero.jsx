import { motion } from 'framer-motion';
import HeroIllustration from './HeroIllustration';

export default function Hero() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 pt-48 pb-20 relative z-10">

        {/* Content */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-left">
            Test Anything in <br className="hidden sm:block" />
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              Second Brain
            </span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed text-left">
            Collectives of AI personas that allow you to run experiments in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
              Try Free
            </button>

            <button className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-lg text-white">
              Explore Features
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  )
}
