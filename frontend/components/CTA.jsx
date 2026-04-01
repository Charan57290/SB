'use client';
import { Section } from './ui/Section';
import { Button } from './ui/Button';

const CTA = () => {
  return (
    <Section id="cta" className="bg-[#020617] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-[260px] bg-white/5 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 sm:p-14 shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40 pointer-events-none" />
          <div className="absolute -right-32 -top-32 w-[420px] h-[420px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] bg-white/5 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-gradient">
              Start your Second Brain
            </h2>
            <p className="mt-4 text-lg text-[#9ca3af] max-w-2xl">
              Turn your ideas into connected intelligence.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button variant="solid" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
