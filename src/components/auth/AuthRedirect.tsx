'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    const checkAuth = () => {
      // Get user object from localStorage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user?.token;
      
      // Only handle /user route
      if (pathname.startsWith('/user')) {
        if (!token) {
          // If no token and trying to access /user, stay on /user (login)
          return;
        } else {
          // If token exists and trying to access /user, redirect to /rank
          router.push('/rank');
        }
      }
    };

    checkAuth();
    
    // Listen for storage events to handle login/logout from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === null) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname, router]);

  return null;
}
