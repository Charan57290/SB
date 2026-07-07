'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Camera, User, Loader2, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      if (user.avatar) {
        setAvatarPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar}`);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!user || !user.email) return;
    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('name', name);
      if (file) {
        formData.append('avatar', file);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await res.json();
      updateUser(data.user);
      setMessage('Profile updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Error updating profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 h-full p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
          Settings
        </h1>

        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5" /> Personal Information
          </h2>

          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-8">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white/40" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-white/60 uppercase mb-1">Profile Picture</h3>
                <p className="text-xs text-white/40">Click the avatar to upload a new image. Max size 5MB.</p>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold tracking-widest text-white/60 uppercase mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
                placeholder="Enter your name"
              />
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="block text-sm font-bold tracking-widest text-white/60 uppercase mb-2">
                Email Address
              </label>
              <input
                type="text"
                value={user?.email || ''}
                readOnly
                className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white/40 cursor-not-allowed"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm">
                {message && (
                  <span className={message.includes('Error') ? "text-red-400" : "text-green-400"}>
                    {message}
                  </span>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
