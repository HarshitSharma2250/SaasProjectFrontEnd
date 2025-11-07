'use client'

import { genderOption, initialValues, lregisterValidation } from "@/helpers/registerForm";
import { register } from "@/services/authenticationFOrms";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FormTags } from "../common/tags";
import { toast } from 'react-toastify';
import { useAuthStore } from "@/config/zustand/loginStore";



export default function RegisterFormComponent() {

  const { setToken ,setUserId} = useAuthStore()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['loginForm'],
    mutationFn: register,
    onSuccess: (data) => {
      console.log("check data getting-", data)
      setToken(data?.token)
       setUserId(data?.userId)
      toast.success(data?.msg);
      router.push('/dashboard');
    }
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: lregisterValidation,
    onSubmit: ((values) => {
      mutate(values)
    })
  })

  const baseclasses = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"

  return (


    <>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[646.14px] m-auto rounded-2xl flex flex-col gap-5"
      >
        <h2 className="text-center text-4xl font-bold">Register Form</h2>

        <FormTags className={`${baseclasses}`} type="text" label="userName" name="name" formik={formik} placeholder="write your name" />

        <FormTags className={`${baseclasses}`} type="email" required label="Email: " name="email" formik={formik} placeholder="myemail123@gmail.com" />

        <FormTags className={`${baseclasses}`} type="number" required label="Age: " name="age" formik={formik} placeholder="enter your age" />

        <FormTags className={`${baseclasses}`} type="text" required label="Number: " name="number" formik={formik} placeholder="enter your mobile number" />

        <FormTags className={`${baseclasses}`} type="password" required label="PAssword: " name="password" formik={formik} placeholder="***...." />

        <FormTags className={`${baseclasses}`} type="select" required label="Gender: " name="gender" options={genderOption} formik={formik} data-testid={`gender-select`} />

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 rounded-md text-white font-medium mt-3 ${isPending
            ? "bg-gray-400 cursor-not-allowed "
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isPending ? "Registering in..." : "Register"}
        </button>

      </form>







    </>
  )



}