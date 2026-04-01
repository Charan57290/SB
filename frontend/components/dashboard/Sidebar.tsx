'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Share2, 
  FolderKanban, 
  Settings,
  BrainCircuit,
  LogOut,
  Sparkles,
  Command
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageSquare, label: 'Assistant', href: '/assistant' },
  { icon: FileText, label: 'Nodes', href: '/notes' },
  { icon: Share2, label: 'Neural Map', href: '/graph' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-72 bg-black border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Premium Logo Section */}
      <div className="h-24 flex items-center px-10 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-2xl bg-white text-black group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-white/10">
            <Command className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tighter uppercase leading-none">Second <span className="text-gray-500">Brain</span></span>
            <span className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.3em] mt-1">Core Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-10 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-white text-black shadow-lg shadow-white/5" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-transform duration-500 group-hover:scale-110",
                isActive ? "text-black" : "text-gray-600 group-hover:text-white"
              )} />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">{item.label}</span>
              {isActive && (
                <motion.div 
                   layoutId="active-pill"
                   className="absolute right-4 w-1.5 h-1.5 rounded-full bg-black"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-8 border-t border-white/5 bg-gradient-to-t from-white/[0.02] to-transparent">
        <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black font-bold shadow-lg shadow-white/5 uppercase">
              {user?.name ? user.name.substring(0, 2) : 'US'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white uppercase truncate">{user?.name || 'User'}</p>
              <p className="text-[9px] text-gray-600 font-medium uppercase tracking-widest mt-0.5">Brain v.2.4</p>
            </div>
            <button onClick={handleLogout} className="p-2 -mr-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/logout">
               <LogOut className="w-4 h-4 text-gray-700 group-hover/logout:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
