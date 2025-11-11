"use client"

import { useAuthStore } from "@/config/zustand/loginStore"
import keyMatrix from "@/services/dashboardServices"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import matrixImage from "@/public/dashboard/circular-arrow.png"


export default function DashBoardSections() {

    const { token } = useAuthStore()

    const { data } = useQuery({
        queryKey: ['matrix'],
        queryFn: () => keyMatrix(token),
    })


    const sectionClass = `flex gap-7 items-center shadow-md px-4 py-2 rounded-xl bg-white`

    return (
        <div className="flex justify-between w-full  flex-wrap mt-2" >
            <section className={sectionClass}>
                <div className="w-15 h-15 bg-gray-200 flex justify-center items-center  rounded-full ">
                    <Image src={matrixImage} alt="matrix-image" width={30} height={30} />
                </div>
                <div>
                    <p className="text-sm">Active User Count</p>
                    <p className="font-bold">{data?.activeCount}</p>
                </div>
            </section>
            <section className={sectionClass}>
                <div className="w-15 h-15 bg-gray-200 flex justify-center items-center  rounded-full">
                    <Image src={matrixImage} alt="matrix-image" width={30} height={30} />
                </div>
                <div>
                    <p className="text-sm">New Register User</p>
                    <p className="font-bold">{data?.newUser}</p>
                </div>
            </section>
            <section className={sectionClass}>
                <div className="w-15 h-15 bg-gray-200 flex justify-center items-center  rounded-full ">
                    <Image src={matrixImage} alt="matrix-image" width={30} height={30} />
                </div>
                <div>
                    <p className="text-sm">Total Revenue Generated</p>
                    <p className="font-bold">{data?.totalRevenue}</p>
                </div>
            </section>
            <section className={sectionClass}>
                <div className="w-15 h-15 bg-gray-200 flex justify-center items-center  rounded-full">
                    <Image src={matrixImage} alt="matrix-image" width={30} height={30} />
                </div>
                <div>
                    <p className="text-sm">Total User Count</p>
                    <p className="font-bold">{data?.totalUser}</p>
                </div>
            </section>

            <section className={sectionClass}>
                <div className="w-15 h-15 bg-gray-200 flex justify-center items-center  rounded-full">
                    <Image src={matrixImage} alt="matrix-image" width={30} height={30} />
                </div>
                <div>
                    <p className="text-sm">Active Wallet Count</p>
                    <p className="font-bold">{0}</p>
                </div>
            </section>
        </div>
    )

}