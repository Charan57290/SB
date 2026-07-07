'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  Heading1, 
  Heading2, 
  Quote as QuoteIcon, 
  Undo, 
  Redo,
  Sparkles,
  Code,
  Save,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  useEffect(() => {
    setMounted(true);
    
    const handleSave = () => {
      setSaveStatus('saving');
      // Simulate/Trigger save
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 800);
    };

    window.addEventListener('workspace:save', handleSave);
    return () => window.removeEventListener('workspace:save', handleSave);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What are you thinking? Type / for commands...',
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[60vh] text-slate-800 text-xl font-light leading-relaxed selection:bg-indigo-100 selection:text-indigo-900 pb-32 transition-all',
      },
    },
  });

  // Ensure content syncs if parent state changes (e.g. after a fetch resolution)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!mounted || !editor) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto z-20">
      {/* Floating Save Status */}
      <AnimatePresence>
        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronizing thought...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Synapse Updated</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Bubble Menu */}
      <BubbleMenu editor={editor} className="flex bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xl ring-1 ring-black/5">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400", editor.isActive('bold') && 'text-slate-900 bg-slate-100')}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400", editor.isActive('italic') && 'text-slate-900 bg-slate-100')}
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-slate-100 mx-1 self-center" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn("p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400", editor.isActive('heading', { level: 2 }) && 'text-slate-900 bg-slate-100')}
        >
          <Heading2 size={18} />
        </button>
      </BubbleMenu>

      <FloatingMenu editor={editor} className="flex flex-col bg-white border border-slate-200 rounded-3xl p-3 shadow-2xl gap-1 min-w-[240px] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Neural Blocks</div>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="flex items-center gap-4 px-3 py-2.5 hover:bg-slate-50 rounded-2xl text-slate-500 hover:text-slate-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-800 transition-all"><Heading1 size={16} /></div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest">Heading Large</span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Alt + 1</span>
          </div>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="flex items-center gap-4 px-3 py-2.5 hover:bg-slate-50 rounded-2xl text-slate-500 hover:text-slate-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-800 transition-all"><Heading2 size={16} /></div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest">Heading Medium</span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Alt + 2</span>
          </div>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="flex items-center gap-4 px-3 py-2.5 hover:bg-slate-50 rounded-2xl text-slate-500 hover:text-slate-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-800 transition-all"><List size={16} /></div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest">Bullet List</span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Alt + L</span>
          </div>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="flex items-center gap-4 px-3 py-2.5 hover:bg-slate-50 rounded-2xl text-slate-500 hover:text-slate-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-800 transition-all"><QuoteIcon size={16} /></div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest">Quote Block</span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Alt + Q</span>
          </div>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="flex items-center gap-4 px-3 py-2.5 hover:bg-slate-50 rounded-2xl text-slate-500 hover:text-slate-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-800 transition-all"><Code size={16} /></div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest">Code Snippet</span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Alt + C</span>
          </div>
        </button>
      </FloatingMenu>

      <EditorContent editor={editor} />
      
      {/* Immersive Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      
      <div className="mt-16 flex items-center justify-between border-t border-slate-100 pt-8 pb-12 relative z-20">
        <div className="flex items-center gap-4">
            <button onClick={() => editor.chain().focus().undo().run()} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200"><Undo size={18}/></button>
            <button onClick={() => editor.chain().focus().redo().run()} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200"><Redo size={18}/></button>
        </div>
        
        <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Synapse Synchronized</p>
                <div className="flex items-center gap-2 mt-1">
                    <Sparkles size={12} className="text-slate-400"/>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-none">Neural Assistant Active</span>
                </div>
            </div>
            
            <button 
                onClick={() => window.dispatchEvent(new CustomEvent('workspace:save'))}
                className="group flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all hover:-translate-y-0.5"
            >
                <Save size={18} className="group-hover:scale-110 transition-transform"/>
                Save Thought
            </button>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;

