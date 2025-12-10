import { UserRole } from '@/types';

/**
 * Application constants
 */

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
} as const;

// App configuration
export const APP_CONFIG = {
  NAME: 'Agree Connect',
  VERSION: '1.0.0',
  DESCRIPTION: 'Agree Connect Frontend Application',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;

export interface NavItem {
  label: string;
  href: string;
  roles: UserRole[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  // Admin only
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    roles: ['admin'],
  },
  {
    label: 'Users',
    href: '/admin/users',
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    roles: ['admin'],
  },
  // Farmer/Seller
  {
    label: 'Dashboard',
    href: '/farmer/dashboard',
    roles: ['seller', 'admin'],
  },
  {
    label: 'My Products',
    href: '/farmer/products',
    roles: ['seller', 'admin'],
  },
  {
    label: 'Orders',
    href: '/farmer/orders',
    roles: ['seller', 'admin'],
  },
  {
    label: 'Requests',
    href: '/farmer/requests',
    roles: ['seller', 'admin'],
  },
  {
    label: 'Analytics',
    href: '/farmer/analytics',
    roles: ['seller', 'admin'],
  },
  // Buyer
  {
    label: 'Dashboard',
    href: '/buyer/dashboard',
    roles: ['buyer', 'admin'],
  },
  {
    label: 'Browse',
    href: '/buyer/browse',
    roles: ['buyer', 'admin'],
  },
  {
    label: 'My Orders',
    href: '/buyer/orders',
    roles: ['buyer', 'admin'],
  },
  // Logistic
  {
    label: 'Shipments',
    href: '/logistic/shipments',
    roles: ['logistic', 'admin'],
  },
  {
    label: 'Tracking',
    href: '/logistic/tracking',
    roles: ['logistic', 'admin'],
  },
  {
    label: 'Reports',
    href: '/logistic/reports',
    roles: ['logistic', 'admin'],
  },
];

