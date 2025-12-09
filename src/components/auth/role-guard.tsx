'use client';

import { ReactNode, useEffect } from 'react';
import { useRole } from '@/hooks/use-role';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();
  const { canAccessRoute } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!canAccessRoute(allowedRoles)) {
      router.push('/');
      return;
    }
  }, [user, allowedRoles, canAccessRoute, router]);

  if (!user) {
    return null;
  }

  if (!canAccessRoute(allowedRoles)) {
    return null;
  }

  return <>{children}</>;
}

