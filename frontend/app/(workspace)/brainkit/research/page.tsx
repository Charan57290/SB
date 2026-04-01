'use client';

import { Microscope, FileSearch, Quote, ShieldCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

export default function ResearchToolsPage() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await api.post('/brainkit/research/summarize', { text: input });
      setSummary(response.data.result);
    } catch {
      setSummary('Error: Summarization failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-8 max-w-6xl mx-auto relative z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white mb-2 uppercase">Research Intelligence Node</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Deep analysis, citation extraction, and integrity verification.</p>
        </div>
        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <FileSearch className="w-3 h-3" />
          Semantic Search Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PDF Summarizer */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 hover:border-white/30 transition-all flex flex-col shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white/40 w-fit">
              <Microscope className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">PDF Intelligence</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Paper Summarizer</h3>
          <p className="text-white/30 text-xs font-medium mb-8 leading-relaxed uppercase tracking-wide">
            Upload complex academic papers or paste text and get a structured intelligence summary.
          </p>
          <textarea 
            className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white mb-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 font-medium"
            placeholder="Paste text here to summarize..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {summary && (
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] text-white/60 leading-relaxed max-h-48 overflow-y-auto uppercase tracking-wide font-medium">
              <h4 className="font-bold text-white mb-2 underline underline-offset-4 uppercase tracking-widest">Intelligence Summary</h4>
              {summary}
            </div>
          )}
          <button 
            onClick={handleSummarize}
            disabled={loading || !input}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-white/5 disabled:opacity-20 transition-all hover:bg-gray-200"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Process Workspace Intelligence'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Citation Generator */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 hover:border-white/30 transition-all flex flex-col shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/40">
                <Quote className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Citation Automator</h3>
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Support for APA, MLA, Harvard, and Chicago. Just paste a URL or DOI.</p>
            <div className="flex gap-4">
              <input type="text" placeholder="URL, DOI, or ISBN..." className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 font-medium" />
              <button className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5">Cite</button>
            </div>
          </div>

          {/* Plagiarism Checker */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 hover:border-white/30 transition-all flex flex-col shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Integrity Verification</h3>
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Scan your writing against trillions of web pages and academic journals.</p>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Status: System Ready</span>
              <button className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white underline underline-offset-4 decoration-white/20">Scan Workspace →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
