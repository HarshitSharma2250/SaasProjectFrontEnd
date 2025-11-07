import { registerFormValidation } from "@/types/registerForm"
import * as yup from "yup"


export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export const initialValues:registerFormValidation={
    email:"",
    name:"",
    number:"",
    gender:"male",
    age:0,
    password:""
}


export const genderOption=[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]


export const lregisterValidation : yup.ObjectSchema<registerFormValidation> = yup.object({
    email: yup.string().email("invalid Email").required("please add correct email address"),
    name: yup
        .string()
        .trim("Name cannot contain only spaces")
        .min(4, "Name should be greater than 4 characters long")
        .required("Name is required"),
    number: yup.string().matches(/^(?:\+91)?\d{10}$/, "Phone number must be 10 digits (optionally start with +91)")
        .required("Phone number is required"),
    gender: yup.mixed<Gender>()
        .oneOf(Object.values(Gender), "Please select a valid gender")
        .required("Gender is required"),
    age: yup.number().typeError("Age must be a number").required("age is required").min(0, "Age cannot be negative")
        .max(130, "Age cannot be more than 130"),
    password: yup.string().min(6, "password should be more then 6 character long").required("password is required")
})