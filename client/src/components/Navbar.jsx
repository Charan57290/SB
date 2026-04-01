import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

const links = [
  { name: 'Features', href: '#features' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Accuracy', href: '#accuracy' },
  { name: 'Pricing', href: '#pricing' }
];

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <nav className="pointer-events-auto flex w-full max-w-7xl items-center justify-between rounded-[2rem] border border-white/5 bg-[#0b0f19]/60 px-6 py-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-lg font-bold tracking-tight text-white group">
            <span className="text-white text-2xl font-light">λ</span>
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              Second Brain
            </span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
