import { ApiMethods } from "@/api/apiMethods";
import { APIsRoutes } from "@/api/apiRoutes";
import { LoginFormValidation, registerFormValidation } from "@/types/registerForm";
import axios from "axios";

export async function register(payload:registerFormValidation):Promise<string>{
const res=await axios[ApiMethods.POST](`https://saasprojectrivisionbackend.onrender.com${APIsRoutes.REGISTER}`,payload)
return res.data;
}



export async function login(payload:LoginFormValidation):Promise<LoginFormValidation>{
const res=await axios[ApiMethods.POST](`https://saasprojectrivisionbackend.onrender.com${APIsRoutes.LOGIN}`,payload)
return res.data;
}

