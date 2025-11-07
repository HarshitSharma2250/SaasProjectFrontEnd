'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/config/zustand/loginStore';

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore();


  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Redirecting...
    </div>
  );
}
