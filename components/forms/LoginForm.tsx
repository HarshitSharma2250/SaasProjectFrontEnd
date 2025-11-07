import { useAuthStore } from "@/config/zustand/loginStore";
import { initialValues, LoginValidation } from "@/helpers/loginForm";
import { login } from "@/services/authenticationFOrms";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";


import { FormTags } from "../common/tags";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { setToken,setUserId } = useAuthStore();



  const { mutate, isPending } = useMutation({
    mutationKey: ['loginForm'],
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data?.token)
      setUserId(data?.userId)
      toast.success(data?.message);
    },
    onError: (err: any) => {
      console.log("chcek cerro--", err?.response)
      toast.error(err?.response?.data?.msg);
    },
  })

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: LoginValidation,
    onSubmit: ((data) => {
      mutate(data)
    })
  })


  const baseclasses = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 mt-4"


  return (


    <form onSubmit={formik.handleSubmit} className="w-full max-w-[646.14px] m-auto rounded-2xl flex flex-col gap-9">
      {/* form text section */}
      <section>
        <p className="font-bold text-[28px] text-[#1F2937] md:text-[45.7px]">
          Login
        </p>
        <p className="font-normal text-[16px] md:text-[20px] text-[#718096]">
          Welcome back, you’ve been missed!
        </p>
      </section>



      <FormTags className={`${baseclasses}`} type="email" required label="Email: " name="email" formik={formik} placeholder="myemail123@gmail.com" />

      <FormTags className={`${baseclasses}`} type="password" required label="Password: " name="password" formik={formik} placeholder="***...." />

      <button
        type="submit"
        disabled={isPending}
        className="block w-full h-10 sm:h-12 md:h-[60px] font-semibold text-white bg-[#8712C2] rounded-2xl mt-[-30px] cursor-pointer"
      >
        {isPending ? "loging in..." : "login"}
      </button>
    </form>
  )
}