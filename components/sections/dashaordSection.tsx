"use client";

import { useAuthStore } from "@/config/zustand/loginStore";
import keyMatrix from "@/services/dashboardServices";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import matrixImage from "@/public/dashboard/circular-arrow.png";

export default function DashBoardSections() {
  const { token } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["matrix"],
    queryFn: () => keyMatrix(token),
  });

  // Style applied to each metric card
  const sectionClass = `
    flex
    items-center
    gap-4
    bg-white
    shadow-md
    rounded-xl
    px-4
    py-3
    h-28
    transition
    hover:shadow-lg
  `;

  // Cards data dynamically structured
  const metrics = [
    { label: "Active User Count", value: data?.activeCount || 0 },
    { label: "New Register User", value: data?.newUser || 0 },
    { label: "Total Revenue Generated", value: data?.totalRevenue || 0 },
    { label: "Total User Count", value: data?.totalUser || 0 },
    { label: "Active Wallet Count", value: 0 },
  ];

  return (
    <section
      className="
        grid
        gap-6
        [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
        mt-2
        w-full
      "
    >
      {metrics.map((metric, i) => (
        <div key={i} className={sectionClass}>
          {/* Icon */}
          <div className="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center">
            <Image src={matrixImage} alt="matrix-icon" width={28} height={28} />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className="font-bold text-lg text-[#8712C2]">
              {metric.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
