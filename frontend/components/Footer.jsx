'use client';
const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[100px] bg-white/5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 text-lg font-bold tracking-tight text-white mb-6">
              <span className="text-white text-2xl font-light">λ</span>
              <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">Second Brain</span>
            </div>
            <p className="text-[#9ca3af] text-sm max-w-sm mb-6 leading-relaxed">
              The AI-powered knowledge management and memory assistant platform. Capture once, remember forever.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                  <span className="text-xs">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li><a href="#" className="hover:text-white transition-colors">Product</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#docs" className="hover:text-white transition-colors">Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Social</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-[#00FFFF] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9ca3af] text-sm">
            © {new Date().getFullYear()} Second Brain Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
            <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] animate-pulse"></span>
            All neural systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
