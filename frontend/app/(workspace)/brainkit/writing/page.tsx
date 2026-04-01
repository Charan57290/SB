'use client';

import { PenTool, CheckCircle2, Copy, Trash2, Sparkles, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';



const TOOLS = [
  { id: 'humanize', label: 'Humanizer', prompt: `You are an expert ghostwriter. Your goal is to rewrite the provided text so that it completely bypasses AI detectors like GPTZero, Originality.ai, and Turnitin, scoring 0% AI. You MUST obey these rules perfectly:

1. HIGH BURSTINESS & PERPLEXITY: Mix extremely short sentences (3-5 words) with longer, complex ones. Break up uniform sentence lengths. Use active voice.
2. HUMAN QUIRKS: Use contractions (can't, didn't, it's). Occasionally use em-dashes (—) or parentheses for natural pauses and side-thoughts.
3. FORBIDDEN WORDS: NEVER use words like: delve, utilize, moreover, furthermore, testament, landscape, tapestry, bustling, pivotal, overarching, robust, intricate, seamless, or in conclusion.
4. TONE: Write casually but professionally, like a human expert explaining something to a colleague. Use simple transition words like "But," "So," "And," or "Look," instead of formal ones.
5. CONTEXT & FORMAT: Do NOT change the factual meaning. Keep the EXACT same markdown structure (headings, bullet points, numbering). Do not merge sections.
6. EXACT LENGTH: The output MUST be within +/- 30 words of the input length.
7. NO PREAMBLE: Return strictly ONE version of the text and nothing else. Do not introduce the text.

Text to rewrite:

` },
  { id: 'paraphrase', label: 'Paraphraser', prompt: 'You are a writing expert. Paraphrase the text below using different words and sentence structures while keeping the same meaning. Output exactly ONE version — your single best paraphrase. Do NOT provide options, alternatives, numbered versions, or any extra text. Just the paraphrased paragraph:\n\n' },
  { id: 'grammar', label: 'Grammar Fix', prompt: 'You are a writing expert. Fix all grammar, punctuation, and spelling errors in the text below. Output exactly ONE corrected version. Do NOT provide options, alternatives, explanations, or any extra text. Just the corrected paragraph:\n\n' },
];

async function callGemini(prompt: string, text: string): Promise<string> {
  const response = await fetch('http://localhost:5000/api/brainkit/writing/generate', {
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
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Powered by Gemini 2.5 Flash</p>
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
              Gemini 2.0 Flash
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
