import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const BrainKitHub = dynamic(() => import('@/components/workspace/BrainKitPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-white/40" />
    </div>
  )
});

export default function BrainKitPage() {
  return <BrainKitHub />;
}
