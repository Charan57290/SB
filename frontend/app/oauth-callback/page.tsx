'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function OAuthCallback() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white/40 uppercase tracking-widest text-[10px]">Initializing Neural Link...</div>}>
      <OAuthCallbackContent />
    </Suspense>
  );
}

function OAuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const avatar = searchParams.get('avatar');

    if (token && name && email) {
      setAuth(token, { name, email, userId: email, avatar: avatar || undefined });
      // Minor delay for the premium loading effect
      setTimeout(() => {
        router.push('/app');
      }, 1500);
    } else {
      router.push('/login?error=OAuthFailed');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="h-screen bg-[#000000] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
          <div className="absolute inset-4 rounded-full bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
        </div>
        <div className="text-center">
          <p className="font-bold tracking-widest uppercase text-xs text-white mb-2">Authenticating Neural Link</p>
          <p className="text-[10px] uppercase text-white/40 font-bold tracking-[0.3em]">Synapse Verified</p>
        </div>
      </div>
    </div>
  );
}
