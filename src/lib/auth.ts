import { UserRole } from '@/types';

export function canAccessRoute(userRole: UserRole | null | undefined, allowedRoles: UserRole[]): boolean {
  if (!userRole) return false;
  if (userRole === 'admin') return true;
  return allowedRoles.includes(userRole);
}

