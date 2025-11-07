
'use client';

import { useRouter } from 'next/navigation';
import {useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/config/zustand/loginStore';
import LoginForm from '@/components/forms/LoginForm';


export default function Login() {

 const token=useAuthStore((state)=>state.token)
const router=useRouter()

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token, router]);





  return (
   <div className="flex items-center justify-center h-[97vh] w-[98%] m-auto mt-2.5">
      <div
     className="flex flex-col items-center justify-center w-full h-full !p-2 bg-no-repeat bg-cover sm:!p-3 rounded-3xl"
  style={{ backgroundImage: "url('/authImages/signup_background.jpeg')" }}
      >
    <LoginForm/>
      <p className="text-center text-sm">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
    </div>
  );
}
