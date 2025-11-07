
import LoginForm from "@/components/forms/LoginForm";
import { login } from "@/services/authenticationFOrms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import LoginForm from "@/components/forms/LoginForm"
import axios from "axios";

const queryClient= new QueryClient();
jest.mock("axios")
// ✅ make a mocked version of axios for TypeScript
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("auth-page",()=>{

    beforeEach(()=>{
        jest.clearAllMocks()
    })

     // because using query in login form so in test , i ahve to also use that, because we are taking whole loginform 
test("test-element",()=>{
render(
  <QueryClientProvider client={queryClient}>
    <LoginForm/>
  </QueryClientProvider>
)

let arr=["myemail123@gmail.com","***...."]

arr.forEach((ele)=>{
  expect(screen.getByPlaceholderText(ele)).toBeInTheDocument()
})

// const emailInput=screen.getByPlaceholderText("myemail123@gmail.com");
// expect(emailInput).toBeInTheDocument();


// const passowrdInput=screen.getByPlaceholderText("***....");
// expect(passowrdInput).toBeInTheDocument();


const buttonRole=screen.getByRole("button",{name:/login/i})
expect(buttonRole).toBeInTheDocument()

})


})



describe("api-calling",()=>{

afterEach(()=>{
    jest.clearAllMocks()
})


test("should call axios.post with correct URL and data",async()=>{
const fakeResponse={
    data:{token:"this is mocktoken",message:"user logged in successfully"}
}
 // Step 2: Tell axios to “pretend” to return that fake data
 mockedAxios.post.mockResolvedValueOnce(fakeResponse);


    // Step 3: Call our login() function
const payload={emial:"mockEmail123@gmail.com", password:'1234567'}
const response=await login(payload)

  // Step 4: Check what happened
    // Did axios.post get called exactly once?
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)


    // Did axios.post get called with the correct endpoint and payload?
expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:4500/api/login",payload)

    // Did login() return the fake data we expected?
expect(response).toEqual(fakeResponse.data)


})

//  Second test — failed login
  test("should throw error if API fails", async () => {
// interface returnType{
//     name:string;
//     number:number
// }

// function Myname(name:string,number:number):returnType{
//     return {name,number}
// }

    const payload={emial:"mockEmail123@gmail.com", password:'1234567'}

    // Step 1: Tell axios to pretend the API failed
    mockedAxios.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    // Step 2: Call login() and expect it to fail
    await expect(login(payload)).rejects.toThrow("Invalid credentials");

    // Step 3: axios should still have been called once
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });


})


