import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types';
import { canAccessRoute } from '@/lib/auth';

export function useRole() {
  const { role } = useAuth();
  return {
    role,
    canAccessRoute: (allowedRoles: UserRole[]) => canAccessRoute(role, allowedRoles),
  };
}

