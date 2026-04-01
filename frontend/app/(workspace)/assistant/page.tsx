import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const NeuralAssistant = dynamic(() => import('@/components/workspace/NeuralAssistant'), { 
  ssr: false, 
  loading: () => <div className="h-[80vh] flex items-center justify-center bg-transparent"><Loader2 className="w-8 h-8 animate-spin text-white/40" /></div> 
});

export default function AssistantPage() {
  return <NeuralAssistant />;
}
