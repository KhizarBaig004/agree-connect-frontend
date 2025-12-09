'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRole } from '@/hooks/use-role';
import { NAVIGATION_ITEMS } from '@/constants';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { usePathname } from 'next/navigation';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { canAccessRoute } = useRole();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      setIsDark(root.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentIsDark = root.classList.contains('dark');
    setTheme(currentIsDark ? 'light' : 'dark');
    setIsDark(!currentIsDark);
  };

  const visibleNavItems = NAVIGATION_ITEMS.filter((item) => canAccessRoute(item.roles));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 dark:border-green-800 bg-white dark:!bg-black backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <Link href="/" className="mr-6 font-bold text-xl cursor-pointer">
          Agree Connect
        </Link>
        
        {user && (
          <nav className="flex flex-1 items-center space-x-6 text-sm">
            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer ${pathname?.startsWith(item.href) ? 'font-semibold' : 'text-muted-foreground'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer focus:outline-none">
                  <Avatar name={user.name} size="sm" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={toggleTheme}
                >
                  {isDark ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/auth/register"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

