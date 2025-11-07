import RegisterFormComponent from "@/components/forms/RegisterForm";

export default function Register(){
    return (
  
           <div className="flex items-center justify-center h-[97vh] w-[98%] m-auto mt-2.5">
      <div
     className="flex flex-col items-center justify-center w-full h-full !p-2 bg-no-repeat bg-cover sm:!p-3 rounded-3xl"
  style={{ backgroundImage: "url('/authImages/signup_background.jpeg')" }}
      >
            <RegisterFormComponent/>
        </div>
        </div>
    )
}