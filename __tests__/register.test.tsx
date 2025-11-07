import RegisterFormComponent from "@/components/forms/RegisterForm";
import { register } from "@/services/authenticationFOrms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import axios from "axios";



jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;
const queryClient=new QueryClient()


export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});



describe("register-input-button test",()=>{

beforeEach(()=>{
    jest.clearAllMocks()
})


test("buttons-inputFields",()=>{
render(
    <QueryClientProvider client={queryClient}>
    <RegisterFormComponent/>
    </QueryClientProvider>
)

let arr=["myemail123@gmail.com","write your name","enter your age","enter your mobile number","***...."]

arr.forEach(ele => {
  expect(screen.getByPlaceholderText(ele)).toBeInTheDocument()
});
const buttonRole=screen.getByRole("button",{name:/Register/i});
expect(buttonRole).toBeInTheDocument()

})



    
})


describe("api-calling-register",()=>{

beforeAll(async()=>{
  jest.clearAllMocks()
})



test("check api",async()=>{

  //first will check fake response
  const fakeResponse = {
    data: { message: "registration has been completed successfully" }
  };



 // Step 2: Tell axios to “pretend” to return that fake data
 mockedAxios.post.mockResolvedValueOnce(fakeResponse)


// Step 3: Call our  function with payload
const payload={name:"harshit",email:"harshit295@gmail.com",age:22,numer:1111111111,gender:'male'}
const res=await register(payload)

 // Step 4: Check what happened
    // Did axios.post get called exactly once?

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)

    // Did axios.post get called with the correct endpoint and payload?
    expect(mockedAxios.post).toHaveBeenCalledWith(`http://localhost:4500/api/register`,payload)

// Did login() return the fake data we expected?
expect(res).toEqual(fakeResponse.data.message)

})



test("failure-test",async()=>{

//first make a payload
const payload={name:"harshit",email:"harshit295@gmail.com",age:22,numer:1111111111,gender:'male'}
 // Step 1: Tell axios to pretend the API failed
 mockedAxios.post.mockRejectedValueOnce(new Error("invalid data"));

   // Step 2: Call login() and expect it to fail
  await  expect(register(payload)).rejects.toThrow("invalid data");


   // Step 3: axios should still have been called once
   expect(mockedAxios.post).toHaveBeenCalledTimes(1)
})




})



