'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import VideoHero from '@/components/VideoHero';
import api from '@/lib/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-6 overflow-hidden">
      <VideoHero />
      <Link href="/" className="absolute top-8 left-8 z-10 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight text-white mb-6">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-3xl font-light">λ</span>
            <span>Second Brain</span>
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2">Start your journey to collective intelligence.</p>
        </div>

        <form onSubmit={handleRegister} className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 pl-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 pl-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-gray-500"
              placeholder="name@university.edu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 pl-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 pl-1">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] mt-4 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Creating Account...' : 'Create Free Account'}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Already have an account? {' '}
              <Link href="/login" className="text-white font-bold hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">Sign In</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
