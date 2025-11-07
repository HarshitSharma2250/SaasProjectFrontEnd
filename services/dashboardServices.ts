import { ApiMethods } from "@/api/apiMethods";
import { APIsRoutes } from "@/api/apiRoutes";
import { useAuthStore } from "@/config/zustand/loginStore";
import { matrixResponse, revenueUser } from "@/types/registerForm";
import axios from "axios";




export default async function keyMatrix(token: string | null): Promise<matrixResponse> {
  const res = await axios[ApiMethods.GET](`https://saasprojectrivisionbackend.onrender.com/${APIsRoutes.DASHBOARD_MATRIX}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res?.data

}


export async function UserRevinueData(token: string |null ): Promise<Array<revenueUser>> {
  const res = await axios[ApiMethods.GET](`https://saasprojectrivisionbackend.onrender.com/${APIsRoutes.USER_REVINUE_DATA}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res?.data?.data

}