'use client';
import { motion } from 'framer-motion';
import { Section, SectionHeader } from './ui/Section';
import { Button } from './ui/Button';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for personal knowledge.',
    features: [
      'Up to 1,000 nodes',
      'AI Semantic Search',
      'Knowledge Graph',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    description: 'For advanced recall & power.',
    features: [
      'Unlimited nodes & links',
      'Neural Assistant',
      'Full Visualization',
      'Priority processing',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'solid',
    popular: true,
  },
  {
    name: 'Team',
    price: 'Custom',
    description: 'For collective intelligence.',
    features: [
      'Team workspaces',
      'SSO & Security',
      'Custom models',
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'outline',
    popular: false,
  },
];

const PricingCard = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative rounded-[2rem] p-8 flex flex-col ${
        tier.popular
          ? 'bg-white/5 border border-white/30 shadow-[0_0_55px_rgba(255,255,255,0.1)] glow-effect'
          : 'bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]'
      } backdrop-blur-xl`}
    >
      {tier.popular && (
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <span className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
          {tier.price !== 'Custom' && <span className="text-[#9ca3af]">/ month</span>}
        </div>
        <p className="text-sm text-[#9ca3af]">{tier.description}</p>
      </div>

      <ul className="flex-1 flex flex-col gap-4 mb-8">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
            <svg className="w-5 h-5 text-white shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/90">{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant={tier.buttonVariant} className="w-full">
        {tier.buttonText}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <Section id="pricing" className="bg-black relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <SectionHeader 
        title="Simple pricing"
        subtitle="Start for free, upgrade as your brain grows."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 relative z-10">
        {tiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Pricing;
