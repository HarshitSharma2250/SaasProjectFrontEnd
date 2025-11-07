'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/config/zustand/loginStore';
import { connectSocket, disconnectSocket } from '@/config/socket';


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token,userId } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token && !userId) {
       disconnectSocket();
      router.push('/login');
    }else{
           connectSocket();
    }
  }, [token, router]);

  if (!token) return null;

  return <>

    {children}



  </>;
}
