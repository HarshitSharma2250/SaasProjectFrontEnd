'use client';

import ExchangeRateChart from "@/components/sections/charts/exchangeRateChart";
import TransectionVolumeChart from "@/components/sections/charts/TransectionVolumeChart";
import UserRegistrationChart from "@/components/sections/charts/userRegistratioChart";
import DashBoardSections from "@/components/sections/dashaordSection";
import TopPerformingUsers from "@/components/sections/TopPerformingUsers";

export default function Dashboard() {
  const trnasection = 200000;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* === Top metrics section === */}
      <section className="mb-10">
        <DashBoardSections />
      </section>

      {/* === Charts Section === */}
      <section
        className="
          grid
          gap-6
          [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]
          auto-rows-auto
        "
      >
        {/* Registration Chart (Big, spans 2 columns on large screens) */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col lg:col-span-2">
          <h3 className="text-center font-semibold mb-3">Registration Chart</h3>
          <UserRegistrationChart />
        </div>

        {/* Total Transaction (Normal width) */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col">
          <h3 className="text-center font-semibold mb-2">Total Transaction</h3>
          <h3 className="font-bold text-center mb-4">
            ₹ {trnasection.toLocaleString()}
          </h3>
          <TransectionVolumeChart />
        </div>

        {/* Top Performing Users (Normal width) */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col">
          <h3 className="text-center font-semibold mb-3">
            Top Revenue Generated Users
          </h3>
          <TopPerformingUsers />
        </div>
      </section>

      {/* === Exchange Rate Chart === */}
      <section className="mt-10">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-center font-semibold mb-3">Exchange Rate Chart</h3>
          <ExchangeRateChart />
        </div>
      </section>
    </div>
  );
}
