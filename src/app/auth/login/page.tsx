'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserRole } from '@/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Mock login - determine role from email
    setTimeout(() => {
      let role: UserRole = 'seller'; // Default to seller/farmer
      if (email.includes('admin') || email.includes('@admin')) role = 'admin';
      else if (email.includes('buyer') || email.includes('@buyer')) role = 'buyer';
      else if (email.includes('logistic') || email.includes('@logistic')) role = 'logistic';
      else if (email.includes('seller') || email.includes('farmer') || email.includes('@seller')) role = 'seller';

      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role,
      };

      const mockToken = `mock-token-${Date.now()}`;

      login(mockUser, mockToken);
      router.push('/');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/agriculture-bg.jpg)',
        }}
      />
      
      {/* Dark overlay for readability - lighter so image shows through */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/50 via-amber-900/40 to-orange-900/50"></div>
      
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500/90 to-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">Agree Connect</CardTitle>
          <CardDescription className="text-base text-white/90 font-medium drop-shadow">
            Direct from Farm to Table
          </CardDescription>
          <p className="text-sm text-white/80 mt-2 drop-shadow">
            Connect farmers directly with buyers. No middleman, maximum profit.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-200 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium drop-shadow">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium drop-shadow">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Your Account'}
            </Button>

            <div className="text-center text-sm text-white/90 drop-shadow">
              Don't have an account?{' '}
              <a href="/auth/register" className="text-white font-medium underline-offset-4 hover:underline cursor-pointer">
                Sign up here
              </a>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-center text-white/80 drop-shadow">
              Join as a <span className="font-semibold text-white">Farmer</span>,{' '}
              <span className="font-semibold text-white">Buyer</span>, or{' '}
              <span className="font-semibold text-white">Logistic Partner</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

