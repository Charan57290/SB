import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const KnowledgeGraph = dynamic(() => import('@/components/workspace/KnowledgeGraph'), { 
  ssr: false, 
  loading: () => <div className="h-[80vh] flex items-center justify-center bg-transparent"><Loader2 className="w-8 h-8 animate-spin text-white/40" /></div> 
});

export default function GraphPage() {
  return <KnowledgeGraph />;
}
