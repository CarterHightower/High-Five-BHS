"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 bg-white min-h-[calc(100vh-56px)]">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-semibold">Log in</h1>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
              placeholder="you@example.com" 
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
              placeholder="••••••••" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Log in'}
          </button>
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-black/5 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {/* Google G logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.706 32.658 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.152 7.961 3.039l5.657-5.657C33.64 6.087 29.084 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.35 16.734 18.809 14 24 14c3.059 0 5.842 1.152 7.961 3.039l5.657-5.657C33.64 6.087 29.084 4 24 4 16.318 4 9.689 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.196l-6.19-5.238C29.133 35.091 26.676 36 24 36c-5.196 0-9.69-3.356-11.297-8.019l-6.541 5.038C9.507 39.581 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.358 3.658-4.808 6-11.303 6 0 0 0 0 0 0-5.196 0-9.69-3.356-11.297-8.019l-6.541 5.038C9.507 39.581 16.227 44 24 44c7.732 0 20-4 20-20 0-1.341-.138-2.651-.389-3.917z"/>
            </svg>
            Continue with Google
          </button>
        </form>
        <p className="text-sm mt-4">No account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </section>
  );
}

