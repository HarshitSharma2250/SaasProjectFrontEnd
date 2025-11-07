import { ApiMethods } from "@/api/apiMethods";
import { APIsRoutes } from "@/api/apiRoutes";
import { LoginFormValidation, LoginFormValues, registerFormValidation, registerResponse } from "@/types/registerForm";
import axios from "axios";

export async function register(payload:registerFormValidation):Promise<registerResponse>{
const res=await axios[ApiMethods.POST](`https://saasprojectrivisionbackend.onrender.com${APIsRoutes.REGISTER}`,payload)
return res.data;
}



export async function login(payload:LoginFormValues):Promise<LoginFormValidation>{
const res=await axios[ApiMethods.POST](`https://saasprojectrivisionbackend.onrender.com${APIsRoutes.LOGIN}`,payload)
return res.data;
}

