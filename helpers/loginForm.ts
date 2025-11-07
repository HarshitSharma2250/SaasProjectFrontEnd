import { LoginFormValidation } from "@/types/registerForm"
import * as yup from "yup"


export const initialValues:LoginFormValidation={
    email:"",
    password:""
}

export const LoginValidation:yup.ObjectSchema<LoginFormValidation> =yup.object({
    email:yup.string().email("email is not valid").required("email is required"),
    password:yup.string().min(6, "password should be more then 6 character long").required("password is required")
})