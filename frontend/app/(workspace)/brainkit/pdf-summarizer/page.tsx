'use client';

import { Microscope, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

import axios from 'axios';

export default function PDFSummarizerPage() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input && !file) return;
    setLoading(true);
    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        if (input) formData.append('text', input);
        
        response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/brainkit/research/summarize`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        response = await api.post('/brainkit/research/summarize', { text: input });
      }
      setSummary(response.data.result);
    } catch (error: any) {
      console.error(error);
      setSummary(`Error: ${error.response?.data?.message || error.message || 'Summarization failed.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto relative z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white mb-2 uppercase">PDF Summarizer</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Deep analysis and intelligence extraction.</p>
        </div>
      </div>

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
        <div className="mb-6">
          <label className="block w-full cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 border-dashed rounded-2xl p-6 text-center transition-all">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-2">
              {file ? file.name : 'Click to Upload PDF'}
            </span>
            <span className="text-xs text-white/30">
              {file ? 'Click to change file' : 'Maximum file size: 10MB'}
            </span>
            <input 
              type="file" 
              accept=".pdf,application/pdf" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">OR</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>
        <textarea 
          className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white mb-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 font-medium"
          placeholder="Paste text here to summarize..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {summary && (
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] text-white/60 leading-relaxed max-h-64 overflow-y-auto uppercase tracking-wide font-medium">
            <h4 className="font-bold text-white mb-2 underline underline-offset-4 uppercase tracking-widest">Intelligence Summary</h4>
            {summary}
          </div>
        )}
        <button 
          onClick={handleSummarize}
          disabled={loading || (!input && !file)}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-white/5 disabled:opacity-20 transition-all hover:bg-gray-200"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Process Workspace Intelligence'}
        </button>
      </div>
    </div>
  );
}
