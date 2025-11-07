"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SaasLogo from "../common/SaasLogo";
// import logo from "@/public/dashboard/ChatGPT Image Nov 6, 2025, 10_51_00 AM.png"


export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Liquidity Pool", href: "/dashboard/liquidityPool" },
    // { name: "Transaction Management", href: "/dashboard/transactions" },
    // { name: "Customer Management", href: "/dashboard/customers" },
    // { name: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <aside className="w-64 bg-white flex flex-col h-screen">
      <div className="p-4.5 flex items-center justify-center ">
        <span className="text-xl font-bold text-purple-700">
        <SaasLogo/>
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-gray-400 text-center">
        © 2025 Saas Project
      </div>
    </aside>
  );
}
