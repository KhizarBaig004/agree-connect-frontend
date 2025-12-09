'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { User } from '@/types';

export default function SetupFarmerPage() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const farmerUser: User = {
      id: 'farmer-1',
      name: 'John Farmer',
      email: 'farmer@example.com',
      role: 'seller',
    };

    const mockToken = 'mock-token-farmer-123';
    
    login(farmerUser, mockToken);
    
    // Redirect to farmer dashboard after setting up
    setTimeout(() => {
      router.push('/farmer/dashboard');
    }, 500);
  }, [login, router]);

  return (
    <div className="container mx-auto py-8 text-center">
      <p>Setting up farmer user...</p>
      <p className="text-sm text-muted-foreground mt-2">Redirecting to dashboard...</p>
    </div>
  );
}

