'use client';

import TransectionVolumeChart from "@/components/sections/charts/TransectionVolumeChart";
import UserRegistrationChart from "@/components/sections/charts/userRegistratioChart";
import DashBoardSections from "@/components/sections/dashaordSection";
import TopPerformingUsers from "@/components/sections/TopPerformingUsers";

// import { useRouter } from 'next/navigation';




export default function Dashboard() {
   const trnasection = 200000;



  return (
  <div>
      <section >
<DashBoardSections/>
      </section>

<section className="flex gap-2 mt-10 items-center gap-5 flex-wrap justify-between">

 <div className="bg-[#fff] p-5 rounded-xl">
  <h3 className="text-center">Registration Chart</h3>
   <UserRegistrationChart/>
 </div>

<div className="bg-[#fff] p-5 rounded-xl">
  <h3 className="text-center">Total Transection</h3>
   <h3 className="font-bold"> ₹ :  {trnasection}</h3>
  <TransectionVolumeChart/>
</div>


<div className="bg-[#fff] p-5 rounded-xl">
  <h3 className="text-center font-bold">Top Revinue Generated Users</h3>
  <TopPerformingUsers/>
</div>

</section>



    </div>
  );
}
