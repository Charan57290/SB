'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Share2, Maximize2, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function KnowledgeGraph() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const { user } = useAuthStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const queryId = user?.userId || user?.id || '';
        const res = await api.get(`/notes?userId=${queryId}`);
        setNotes(res.data);
      } catch (err) {
        console.error('Failed to fetch nodes:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const queryId = user?.userId || user?.id || '';
        const res = await api.get(`/notes/topics?userId=${queryId}`);
        setTopics(res.data || []);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchNotes();
    fetchTopics();
  }, [user]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setDimensions({
                width: entry.contentRect.width,
                height: entry.contentRect.height
            });
        }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  const graphData = useMemo(() => {
    const nodes = notes.map(note => ({
      id: note.id,
      name: note.title || 'Untitled Node',
      val: Math.max(2, (note.content?.length || 0) / 100)
    }));

    const links: any[] = [];
    for (let i = 0; i < nodes.length; i++) {
        if (i > 0) {
            links.push({
                source: nodes[i].id,
                target: nodes[Math.floor(Math.random() * i)].id
            });
        }
    }

    return { nodes, links };
  }, [notes]);

  const [hoverNode, setHoverNode] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
     if (!searchQuery) return graphData;
     const lowerQuery = searchQuery.toLowerCase();
     return {
         ...graphData,
         nodes: graphData.nodes.map(n => ({
             ...n,
             isHighlighted: n.name.toLowerCase().includes(lowerQuery)
         }))
     };
  }, [graphData, searchQuery]);

  const getNodeColor = (node: any) => {
      if (node.isHighlighted) return '#3b82f6';
      if (node.val > 6) return '#ffffff';
      if (node.val > 3) return '#94a3b8';
      return '#475569';
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <div className="flex-1 px-4 md:px-10 lg:px-14 py-6 md:py-10 max-w-7xl mx-auto w-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter uppercase mb-1 md:mb-2">Neural Network</h1>
              <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em]">Contextual cognitive topology.</p>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="relative flex-1 md:flex-initial">
                    <input 
                        type="text" 
                        placeholder="Locate..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all w-full md:w-48 uppercase tracking-widest"
                    />
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="p-2 rounded-xl border border-white/10 text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 relative">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl backdrop-blur-3xl relative min-h-[400px] lg:min-h-0"
          >
            {loading ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-2 animate-pulse">Synchronizing Neural Field...</p>
               </div>
            ) : (
              <ForceGraph2D
                graphData={filteredData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                nodeLabel="name"
                nodeRelSize={4}
                linkCurvature={0.25}
                linkColor={() => 'rgba(255,255,255,0.06)'}
                linkDirectionalParticles={1}
                linkDirectionalParticleSpeed={0.004}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.4}
                onNodeHover={node => setHoverNode(node)}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                  const label = node.name;
                  const isHovered = hoverNode === node;
                  const isSelected = selectedNode?.id === node.id;
                  const isHighlighted = node.isHighlighted;
                  
                  const fontSize = (globalScale > 2 ? 10 : 12) / globalScale;
                  ctx.font = `${fontSize}px Inter, sans-serif`;

                  // Draw Node Aura (Glow)
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.val + (isHovered || isSelected ? 8 : 2), 0, 2 * Math.PI, false);
                  ctx.fillStyle = (isHovered || isSelected || isHighlighted) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)';
                  ctx.fill();

                  // Draw Node Core
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
                  ctx.fillStyle = isSelected ? '#ffffff' : getNodeColor(node);
                  ctx.fill();
                  
                  // Label rendering
                  if (globalScale > 1.4 || isHovered || isSelected || isHighlighted) {
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillStyle = (isHovered || isSelected || isHighlighted) ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
                      ctx.fillText(label, node.x, node.y + node.val + (10 / globalScale) + 5);
                  }

                  if (isHighlighted) {
                      ctx.beginPath();
                      ctx.arc(node.x, node.y, node.val + 10, 0, 2 * Math.PI, false);
                      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
                      ctx.lineWidth = 2 / globalScale;
                      ctx.stroke();
                  }
                }}
                onNodeClick={(node: any) => {
                    setSelectedNode(notes.find(n => n.id === node.id));
                }}
              />
            )}

            {/* HUD Overlay - Hidden on small mobile */}
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity hidden sm:block">
               <div className="flex gap-3">
                  <div className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                     <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Topology</p>
                     <p className="text-xs font-bold text-white uppercase tracking-tighter">Organic</p>
                  </div>
               </div>
            </div>

            {/* AI Topics Display */}
            <div className="absolute bottom-4 inset-x-0 pointer-events-none flex justify-center z-40">
               <div className="flex flex-wrap justify-center gap-2 px-4 max-w-4xl pointer-events-auto">
                 {loadingTopics ? (
                   <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] text-white/60 uppercase tracking-widest flex items-center gap-2">
                     <Loader2 className="w-3 h-3 animate-spin" /> Analyzing Topics...
                   </div>
                 ) : topics.length > 0 ? (
                   topics.map((topic, idx) => (
                     <div key={idx} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-[10px] uppercase font-bold tracking-widest shadow-lg hover:bg-white/20 hover:scale-105 transition-all cursor-default">
                       {topic}
                     </div>
                   ))
                 ) : null}
               </div>
            </div>
          </motion.div>

          {/* Contextual Intelligence Sidebar / Bottom Sheet */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ y: 20, x: 20, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={{ y: 20, x: 20, opacity: 0 }}
                className="fixed bottom-4 inset-x-4 md:relative md:inset-auto md:w-96 bg-black/60 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col backdrop-blur-3xl shadow-2xl overflow-hidden z-50 max-h-[70vh] md:max-h-none"
              >
                <div className="md:hidden w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" onClick={() => setSelectedNode(null)} />
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-6 md:top-8 right-6 md:right-8 text-white/20 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4 rotate-45" />
                </button>

                <div className="mb-6 md:mb-10">
                   <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Neural Inspector</span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase leading-[0.9] mb-4">
                     {selectedNode.title}
                   </h2>
                   <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white/30 uppercase tracking-widest font-mono">
                         ID: {selectedNode.id.slice(0, 8)}
                       </span>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide mb-6 md:mb-8">
                   <p className="text-xs md:text-sm text-white/60 leading-relaxed font-medium">
                     {selectedNode.content?.replace(/<[^>]*>/g, '').slice(0, 400)}
                     {selectedNode.content?.length > 400 && '...'}
                   </p>
                </div>

                <div className="flex flex-col gap-3">
                   <button 
                    onClick={() => window.location.href = `/notes/${selectedNode.id}`}
                    className="w-full bg-white text-black py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                   >
                     Launch Core Node <Maximize2 className="w-3.5 h-3.5" />
                   </button>
                   <button 
                    onClick={() => setSelectedNode(null)}
                    className="w-full bg-white/5 border border-white/10 text-white/60 py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all md:hidden"
                   >
                     Minimize
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
