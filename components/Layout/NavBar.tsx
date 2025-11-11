"use client";

import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../common/breadcrumbs";
import { useAuthStore } from "@/config/zustand/loginStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { disconnectSocket } from "@/config/socket";

export default function NavBar() {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { clearAuth } = useAuthStore();
const router=useRouter()


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


function HandleLogput(){
     clearAuth();
         disconnectSocket();
        toast.info('Logged out');
        router.push('/login');
}


  return (
    <header className="w-full bg-white flex items-center justify-between px-6 py-3 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)]  mb-1.5">
     <div className="flex items-center gap-2">
        <BreadCrumbs />
      </div>
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-1 text-sm focus:outline-none"
          />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="focus:outline-none"
        >
          <img
            src="/profile.png"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
          />
        </button>

        {open && (
          <div
            className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-100 z-50"
          >
            <ul className="text-md text-gray-700 mt-4">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                🔔 Notifications
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                ⚙️ Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                🖼️ Update Image
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer mb-3">
                ✏️ Update Profile
              </li>
              <li className="border-t px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer" onClick={HandleLogput}>
                🚪 Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
