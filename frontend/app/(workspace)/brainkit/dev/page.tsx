'use client';

import { Code2, Brackets, Terminal, Cpu, Copy } from 'lucide-react';
import { useState } from 'react';

export default function DevToolsPage() {
  const [input, setInput] = useState('{\n  "project": "Second Brain",\n  "status": "in-progress"\n}');

  return (
    <div className="space-y-8 max-w-6xl mx-auto relative z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white mb-2 uppercase">Developer Intelligence</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Data formatting, code optimization, and regex engineering.</p>
        </div>
        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          Runtime OK
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col h-[600px] backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              {['JSON', 'Code', 'Regex', 'Base64'].map(tab => (
                <button key={tab} className="text-[9px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors px-2 py-1">
                  {tab}
                </button>
              ))}
            </div>
            <button className="text-white/20 hover:text-white"><Copy className="w-4 h-4" /></button>
          </div>
          
          <textarea 
            className="flex-1 bg-black/40 rounded-2xl p-6 text-sm font-mono text-white/70 placeholder:text-white/5 focus:outline-none border border-white/5 resize-none shadow-inner"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-white text-black font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5">
              Format Intelligence
            </button>
            <button className="flex-1 border border-white/10 hover:border-white/30 text-white font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all">
              Minify
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Tools */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="text-[10px] font-bold text-white/40 mb-6 uppercase tracking-widest border-b border-white/5 pb-4">Active Utilities</h3>
            <div className="space-y-4">
              {[
                { name: 'JSON Validator', icon: Brackets, status: 'Active' },
                { name: 'Regex Engineer', icon: Cpu, status: 'Idle' },
                { name: 'Code Beautifier', icon: Code2, status: 'Active' },
              ].map(tool => (
                <div key={tool.name} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-4 h-4 text-white/40 group-hover:text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">{tool.name}</span>
                  </div>
                  <span className="text-[9px] text-white/10 uppercase font-black">{tool.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-black rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_70%)]"></div>
            <h3 className="text-black font-black mb-2 relative z-10 uppercase tracking-tighter">AI Code Review</h3>
            <p className="text-black/40 text-[10px] font-bold mb-6 relative z-10 uppercase tracking-wide leading-relaxed">Let the brain analyze your logic for vulnerabilities and performance bottlenecks.</p>
            <button className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10">
              Run Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
