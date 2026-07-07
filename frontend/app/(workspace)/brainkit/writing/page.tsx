'use client';

import { PenTool, CheckCircle2, Copy, Trash2, Sparkles, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';



const TOOLS = [
  { id: 'humanize', label: 'Humanizer', prompt: `You are an expert academic ghostwriter. Your goal is to rewrite the provided text so that it sounds like a highly sophisticated human academic while completely bypassing AI detectors (0% AI score). You MUST obey these rules:

1. FORMAL ACADEMIC TONE: Maintain a professional, objective, and scholarly voice. Use precise terminology and sophisticated phrasing. Avoid slang, casual idioms, or "human quirks" that reduce professionalism.
2. HIGH BURSTINESS & COMPLEXITY: Vary sentence structure significantly. Use a mix of complex subordinating clauses and concise, impactful statements. This variety is key to avoiding "robotic" rhythmic patterns.
3. HUMANIZED TRANSITIONS: Use logical, smooth transitions. Instead of formal "Moreover" or "Furthermore," use more natural professional transitions like "Beyond this," "In this context," or "Crucially."
4. NO AI OVERUSE: Avoid common AI "crutch" words like: delve, tapestry, testament, bustling, pivotal, overarching, robust, or "in conclusion."
5. EXACT CONTEXT: Do NOT change the factual meaning or academic integrity of the text. Keep the EXACT same markdown structure.
6. NO PREAMBLE: Return strictly ONE version of the rewritten text and nothing else.

Text to rewrite:

` },
  { id: 'paraphrase', label: 'Paraphraser', prompt: 'You are a writing expert. Paraphrase the text below using different words and sentence structures while keeping the same meaning. Output exactly ONE version — your single best paraphrase. Do NOT provide options, alternatives, numbered versions, or any extra text. Just the paraphrased paragraph:\n\n' },
  { id: 'grammar', label: 'Grammar Fix', prompt: 'You are a writing expert. Fix all grammar, punctuation, and spelling errors in the text below. Output exactly ONE corrected version. Do NOT provide options, alternatives, explanations, or any extra text. Just the corrected paragraph:\n\n' },
];

async function callGemini(prompt: string, text: string): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/brainkit/writing/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, text })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `HTTP error ${response.status}`);
  }

  return data.result ?? 'No response received.';
}

export default function WritingToolsPage() {
  const router = useRouter();
  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    setOutput('');
    setError('');
    try {
      const result = await callGemini(activeTool.prompt, input);
      setOutput(result);
    } catch (err: any) {
      setError(err.message || 'Failed to process. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 selection:bg-white/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-2xl border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase">Writing Intelligence</h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Powered by OpenRouter Intelligence</p>
          </div>
        </div>

        {/* Tool Tabs */}
        <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/10 gap-1">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool); setOutput(''); setError(''); }}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTool.id === tool.id
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[580px]">
        {/* Input Panel */}
        <div className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 flex flex-col shadow-2xl shadow-black/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Input ⌁ {wordCount(input)} words</span>
            <button onClick={() => { setInput(''); setOutput(''); }} className="p-2 rounded-xl text-gray-700 hover:text-white hover:bg-white/5 transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-800 resize-none text-base font-medium leading-relaxed relative z-10 scrollbar-hide"
            placeholder={`Paste your text here to ${activeTool.label.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="mt-6 relative z-10">
            <button
              onClick={handleProcess}
              disabled={!input.trim() || isProcessing}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-white/5 text-[11px] uppercase tracking-widest"
            >
              {isProcessing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing neural output...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Run {activeTool.label}</>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 flex flex-col shadow-2xl shadow-black/50 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Output ⌁ {wordCount(output)} words</span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                copied
                  ? 'bg-white text-black border-white'
                  : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30 disabled:opacity-20'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-white/5 animate-ping absolute inset-0"></div>
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Neural rewrite in progress...</p>
                </motion.div>
              ) : error ? (
                <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <p className="text-[11px] font-bold text-red-400/70 uppercase tracking-widest">{error}</p>
                </motion.div>
              ) : output ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert prose-p:text-base prose-p:text-gray-200 prose-p:font-medium prose-p:leading-relaxed prose-headings:text-white prose-li:text-gray-200 prose-li:text-base max-w-none break-words"
                >
                  <ReactMarkdown>{output}</ReactMarkdown>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center text-gray-700">
                  <FileText className="w-10 h-10 mb-4 opacity-10" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">Output appears here</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3" />
              OpenRouter Model
            </div>
            {output && (
              <button
                onClick={handleProcess}
                className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Regenerate →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
