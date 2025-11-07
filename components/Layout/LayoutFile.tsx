"use client";

import { usePathname } from "next/navigation";
import SideBar from "./sideBar";
import NavBar from "./NavBar";

export default function LayoutFile({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hiddenLayoutRoutes = [
    "/dashboard/full-view",
  ];

const currentPath = pathname ?? "";
const shouldHideLayout = hiddenLayoutRoutes.some((route) =>
  currentPath.startsWith(route.replace(/\[.*?\]/, ""))
);

  if (shouldHideLayout) {
    return <main className="min-h-screen bg-gray-50 p-6">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
