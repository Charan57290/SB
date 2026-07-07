'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderDown, Github, X, Plus, FolderKanban, Globe, GitBranch, ArrowRight } from 'lucide-react';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function ProjectsPage() {
  const { user } = useAuthStore();
  const queryId = user?.userId || user?.id;

  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubRepos, setGithubRepos] = useState<any[] | null>(null);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const [showLocalModal, setShowLocalModal] = useState(false);
  const [localName, setLocalName] = useState('');
  const [localDesc, setLocalDesc] = useState('');

  const [connectingPAT, setConnectingPAT] = useState(false);

  useEffect(() => {
    if (queryId) {
      fetchProjects();
    }
  }, [queryId]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get(`/projects?userId=${queryId}`);
      setProjects(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchGithubRepos = async () => {
    setLoadingRepos(true);
    try {
      const res = await api.get(`/projects/github/repos?userId=${queryId}`);
      setGithubRepos(res.data);
    } catch (e: any) {
      console.error("Fetch repos error:", e.response?.data || e.message);
      setGithubRepos(null); // implies not connected or error
    } finally {
      setLoadingRepos(false);
    }
  };

  const disconnectGithub = async () => {
    try {
      await api.post('/projects/github/connect', { userId: queryId, token: null });
      setGithubRepos(null);
    } catch (e) {
      console.error("Disconnect error:", e);
    }
  };

  const openGithubModal = () => {
    setShowGithubModal(true);
    fetchGithubRepos();
  };

  const handleCreateLocal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localName) return;
    try {
      await api.post('/projects', { name: localName, description: localDesc, userId: queryId });
      setShowLocalModal(false);
      setLocalName('');
      setLocalDesc('');
      fetchProjects();
    } catch (e) {
      console.error("Failed to create project", e);
    }
  };

  const handleImportRepo = async (repo: any) => {
    try {
      await api.post('/projects', { 
        name: repo.name, 
        description: repo.description || 'Imported from GitHub', 
        githubUrl: repo.html_url, 
        userId: queryId 
      });
      setShowGithubModal(false);
      fetchProjects();
    } catch (e) {
      console.error("Failed to import repo", e);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 uppercase">
              Project Pipelines
            </h1>
            <p className="text-white/40 font-medium tracking-wide uppercase text-[10px]">Active workspace node directories & source repositories</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <button 
              onClick={() => setShowLocalModal(true)}
              className="px-6 py-3 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-2"
            >
              <FolderDown className="w-4 h-4" /> New Local
            </button>
            <button 
              onClick={openGithubModal}
              className="px-6 py-3 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <Github className="w-4 h-4" /> GitHub Import
            </button>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingProjects ? (
             [1, 2, 3].map(i => (
                <div key={i} className="h-56 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />
             ))
          ) : projects.length > 0 ? (
            projects.map(project => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group p-8 h-56 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex items-center gap-5 mb-6 relative z-10">
                   <div className="w-14 h-14 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-white/40">
                      {project.githubUrl ? <Github className="w-5 h-5" /> : <FolderKanban className="w-5 h-5" />}
                   </div>
                   <h3 className="text-xl font-bold text-white tracking-tight uppercase truncate">{project.name}</h3>
                </div>
                
                <p className="text-white/30 text-[11px] font-bold uppercase tracking-wider leading-relaxed line-clamp-2 mb-6 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.description || 'No description provided.'}
                </p>

                <div className="mt-auto flex items-center justify-between relative z-10">
                   <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">
                     {new Date(project.createdAt).toLocaleDateString()}
                   </span>
                   {project.githubUrl && (
                     <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[9px] text-white/40 hover:text-white font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all" onClick={(e) => e.stopPropagation()}>
                       <Globe className="w-3.5 h-3.5" /> REPOSITORY
                     </a>
                   )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full h-80 rounded-[2.5rem] bg-white/[0.02] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
              <FolderKanban className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white/50 text-sm font-medium">No projects imported yet.</p>
              <p className="text-white/30 text-xs mt-1 max-w-xs">Create a local project or connect GitHub to populate your pipeline.</p>
            </div>
          )}
        </div>

        {/* GitHub Modal Overlay */}
        <AnimatePresence>
          {showGithubModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setShowGithubModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg max-h-[80vh] flex flex-col bg-[#000000] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-white/5 overflow-hidden"
              >
                <button 
                  onClick={() => setShowGithubModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="mb-8 relative z-10">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 text-white">
                    <Github className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tighter uppercase">GitHub Repositories</h3>
                </div>

                <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                   {loadingRepos ? (
                      <div className="flex flex-col gap-3">
                         {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/[0.03] rounded-2xl animate-pulse" />)}
                      </div>
                   ) : githubRepos ? (
                      <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                            Connected Repositories
                          </p>
                          <button 
                            onClick={disconnectGithub}
                            className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
                          >
                            Disconnect
                          </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                           {githubRepos.length > 0 ? (
                             githubRepos.map((repo: any) => (
                                <div key={repo.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-colors">
                                   <div className="min-w-0 pr-4">
                                      <h4 className="text-sm font-bold text-white flex items-center gap-2 truncate">
                                        <GitBranch className="w-3.5 h-3.5 text-white/40" />
                                        {repo.name}
                                      </h4>
                                      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest truncate">{repo.language || 'Unknown'} - {new Date(repo.updated_at).toLocaleDateString()}</p>
                                   </div>
                                   <button 
                                     onClick={() => handleImportRepo(repo)}
                                     className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-bold text-[10px] uppercase tracking-widest transition-all shrink-0"
                                   >
                                     Import
                                   </button>
                                </div>
                             ))
                           ) : (
                             <p className="text-white/40 text-xs text-center py-10">No repositories found.</p>
                           )}
                        </div>
                      </div>
                   ) : (
                     <div className="py-2 flex flex-col h-full">
                        <div className="mb-6 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                           <div className="p-5 rounded-2xl bg-[#00FFB2]/5 border border-[#00FFB2]/20">
                             <h4 className="text-[#00FFB2] text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                               <Globe className="w-4 h-4" /> Step 1: Create a PAT
                             </h4>
                             <ol className="text-white/70 text-[11px] space-y-2 list-decimal list-inside font-medium leading-relaxed">
                               <li>Go to <b>GitHub Settings</b> &gt; <b>Developer Settings</b></li>
                               <li>Select <b>Personal access tokens</b> &gt; <b>Tokens (classic)</b></li>
                               <li>Click <b>Generate new token (classic)</b></li>
                               <li>Give it a name and check the <b>'repo'</b> scope (mandatory)</li>
                               <li>Copy the generated token immediately</li>
                             </ol>
                             <a 
                               href="https://github.com/settings/tokens/new" 
                               target="_blank" 
                               rel="noreferrer"
                               className="mt-4 w-full py-2.5 rounded-xl border border-[#00FFB2]/20 hover:bg-[#00FFB2]/10 text-[10px] text-[#00FFB2] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all"
                             >
                               Generate Token on GitHub <ArrowRight className="w-3 h-3" />
                             </a>
                           </div>

                           <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                             <h4 className="text-white/80 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                               <Plus className="w-4 h-4" /> Step 2: Connect to Brain
                             </h4>
                             <div className="flex flex-col gap-4">
                               <div>
                                 <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Access Token</label>
                                 <input 
                                   type="password" 
                                   id="githubTokenInput"
                                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00FFB2]/30 transition-all font-medium"
                                   placeholder="ghp_xxxxxxxxxxxxxxxxx"
                                 />
                               </div>
                                <button 
                                  onClick={async () => {
                                    const token = (document.getElementById('githubTokenInput') as HTMLInputElement).value;
                                    if (!token) return;
                                    setConnectingPAT(true);
                                    console.log("DEBUG: Connecting PAT with identifier:", queryId);
                                    try {
                                      const res = await api.post('/projects/github/connect', { userId: queryId, token });
                                      console.log("DEBUG: Connection success:", res.data);
                                      fetchGithubRepos(); // Refresh to show repos
                                    } catch(e: any) {
                                      const errorMsg = e.response?.data?.error || e.message || 'Connection failed.';
                                      console.error("DEBUG: Connection error:", errorMsg);
                                      alert(`${errorMsg} (Searched ID: ${queryId})`);
                                    } finally {
                                      setConnectingPAT(false);
                                    }
                                  }}
                                  disabled={connectingPAT}
                                  className={`w-full ${connectingPAT ? 'bg-white/20' : 'bg-[#00FFB2]'} text-black hover:bg-[#00FFB2]/90 transition-all py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#00FFB2]/10 flex items-center justify-center gap-2`}
                                >
                                  {connectingPAT ? 'Connecting...' : 'Connect Global Access'}
                                </button>
                             </div>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Local Project Modal */}
        <AnimatePresence>
          {showLocalModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setShowLocalModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#000000] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-white/5 overflow-hidden"
              >
                <button 
                  onClick={() => setShowLocalModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-bold text-white tracking-tighter uppercase mb-6 relative z-10">Create Local Pipeline</h3>
                
                <form onSubmit={handleCreateLocal} className="relative z-10 flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Project Name</label>
                    <input 
                      type="text" 
                      required
                      value={localName}
                      onChange={(e) => setLocalName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium"
                      placeholder="e.g. Core Infrastructure"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Description (Optional)</label>
                    <textarea 
                      value={localDesc}
                      onChange={(e) => setLocalDesc(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium resize-none h-24"
                      placeholder="Purpose of this pipeline..."
                    />
                  </div>
                  <button type="submit" className="mt-4 w-full bg-white text-black hover:bg-gray-200 transition-all py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest">
                    Initialize Project
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
