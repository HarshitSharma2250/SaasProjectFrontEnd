"use client";

import { useAuthStore } from "@/config/zustand/loginStore";
import { UserRevinueData } from "@/services/dashboardServices";
import { useQuery } from "@tanstack/react-query";
import PdfGenerator from "../common/pdg generator/PdfGenerator";

export default function TopPerformingUsers() {
  const { token } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["user-revenue-data"],
    queryFn: () => UserRevinueData(token),
  });

  return (
    <div className="flex flex-col h-full">
      {/* ===== Header ===== */}
      <div className="flex justify-end items-center mb-1">
        <PdfGenerator data={data || []} />
      </div>

      {/* ===== Table Section ===== */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.slice(0, 5).map((ele) => (
                <tr
                  key={ele._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {ele.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {ele.email.length > 18
                      ? ele.email.slice(0, 18) + "..."
                      : ele.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right">
                    ₹ {ele.revenue.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
