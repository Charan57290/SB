'use client';

import { FileSearch, Quote, Loader2, Download } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

export default function ResearchToolsPage() {
  const [citationTopic, setCitationTopic] = useState('');
  const [citations, setCitations] = useState<{title: string, authors: string, year: string, summary: string, url?: string}[]>([]);
  const [citationMessage, setCitationMessage] = useState('');
  const [isCiting, setIsCiting] = useState(false);

  const handleGenerateCitations = async () => {
    if (!citationTopic.trim()) return;
    setIsCiting(true);
    setCitations([]);
    setCitationMessage('');
    try {
      const response = await api.post('/brainkit/research/citations', { topic: citationTopic });
      if (response.data.message) {
        setCitationMessage(response.data.message);
      } else if (response.data.citations) {
        setCitations(response.data.citations);
      }
    } catch {
      setCitationMessage('Error fetching citations. Please try again.');
    } finally {
      setIsCiting(false);
    }
  };
  return (
    <div className="space-y-8 max-w-4xl mx-auto relative z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white mb-2 uppercase">Research Intelligence Node</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Citation extraction and generation.</p>
        </div>
        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <FileSearch className="w-3 h-3" />
          Semantic Search Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Citation Generator */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 hover:border-white/30 transition-all flex flex-col shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/40">
                <Quote className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Citation Automator</h3>
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Enter a research topic to generate real academic citations and papers.</p>
            <div className="flex gap-4 mb-6">
              <input 
                type="text" 
                value={citationTopic}
                onChange={(e) => setCitationTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateCitations()}
                placeholder="Enter a research topic..." 
                className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 font-medium" 
              />
              <button 
                onClick={handleGenerateCitations}
                disabled={isCiting || !citationTopic.trim()}
                className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5 disabled:opacity-50 min-w-[100px]"
              >
                {isCiting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Search'}
              </button>
            </div>
            
            {citationMessage && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm text-center">
                {citationMessage}
              </div>
            )}
            
            {citations.length > 0 && (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {citations.map((cite, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1 leading-snug">{cite.title}</h4>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">
                          {cite.authors} • {cite.year}
                        </p>
                      </div>
                      {cite.url && (
                        <a 
                          href={cite.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
                          title="Read this paper on Semantic Scholar"
                        >
                          <Download className="w-3 h-3" />
                          Download / Read
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{cite.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
