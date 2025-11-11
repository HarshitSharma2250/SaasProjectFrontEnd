"use client"

import { useAuthStore } from "@/config/zustand/loginStore"
import { UserRevinueData } from "@/services/dashboardServices"
import { useQuery } from "@tanstack/react-query"
import PdfGenerator from "../common/pdg generator/PdfGenerator"

export default function TopPerformingUsers() {

    const { token } = useAuthStore()

    const { data } = useQuery({
        queryKey: ["user-revenue-data"],
        queryFn: () => UserRevinueData(token)
    })

    return (
        <>
        <PdfGenerator data={data || []}/>


            <table className="mt-5 h-73 ">
                <thead>
             <tr>
                       <th className="px-2">Name </th>
                    <th className="px-3">Email</th>
                    <th>Revenue</th>
             </tr>
                </thead>
                <tbody>
                    {
                        data && data.slice(0,5).map((ele) => (
                            <tr key={ele._id}>
                                <td className="px-4">{ele.name}</td>
                                <td className="px-8">{ele.email.slice(0,10)+"..."}</td>
                                <td className="px-4">{ele.revenue}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}