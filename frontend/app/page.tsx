import Navbar from '../components/Navbar';
import VideoHero from '../components/VideoHero';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import KnowledgeNetwork from '../components/KnowledgeNetwork';
import Integrations from '../components/Integrations';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-white/30 selection:text-white">
      {/* Navbar layer */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="relative">
        <div className="relative min-h-screen">
          <VideoHero />
          <Hero />
        </div>
        <Features />
        <HowItWorks />
        <KnowledgeNetwork />
        <Integrations />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
