'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (token && name && email) {
      setAuth(token, { name, email, userId: email });
      // Minor delay for the premium loading effect
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      router.push('/login?error=OAuthFailed');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          <div className="absolute inset-4 rounded-full bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
        </div>
        <div className="text-center">
          <p className="font-bold tracking-widest uppercase text-sm text-white mb-1">Authenticating Neural Link</p>
          <p className="text-[10px] uppercase text-emerald-400 font-mono tracking-widest">Handshake Verified</p>
        </div>
      </div>
    </div>
  );
}
