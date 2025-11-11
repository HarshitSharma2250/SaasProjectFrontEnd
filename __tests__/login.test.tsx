
import LoginForm from "@/components/forms/LoginForm";
import { useAuthStore } from "@/config/zustand/loginStore";
import { login } from "@/services/authenticationFOrms";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();



jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/config/zustand/loginStore", () => ({
  useAuthStore: jest.fn(),
}));



jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));


jest.mock("@tanstack/react-query", () => {
  const partialMock = jest.requireActual("@tanstack/react-query");
  return { ...partialMock, useMutation: jest.fn() }
})//You’re not mocking the entire library, just the useMutation function itself — which you then fully control with mockReturnValue or mockImplementation.

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));




describe("auth-page", () => {

  const mockSetToken = jest.fn()
  const mockSetUserId = jest.fn()
  const mockMutate = jest.fn()
  const mockPush = jest.fn()



  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Return mocks cleanly here
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });

      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        setToken: mockSetToken,
        setUserId: mockSetUserId,
      });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });//and here useMutate is returing will it undefined that,s called muatate =undefined so we again mocking that muatate by using mockMuate

  })

  test("test-element", async() => {

    // because using query in login form so in test , i ahve to also use that, because we are taking whole loginform 
    render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    )

    let arr = ["myemail123@gmail.com", "***...."]

    arr.forEach((ele) => {
      expect(screen.getByPlaceholderText(ele)).toBeInTheDocument()
    })

    // const emailInput=screen.getByPlaceholderText("myemail123@gmail.com");
    // expect(emailInput).toBeInTheDocument();


    // const passowrdInput=screen.getByPlaceholderText("***....");
    // expect(passowrdInput).toBeInTheDocument();

const emailField=screen.getByTestId("loginEmail");
fireEvent.change(emailField,{
  target:{value:"myemail123@gmail.com"}
})

const passwordField=screen.getByTestId("loginPassword")
fireEvent.change(passwordField,{
  target:{value:"***...."}
})



    const buttonRole = screen.getByRole("button", { name: /login/i })
    expect(buttonRole).toBeInTheDocument()


fireEvent.click(buttonRole);

//  It verifies that after submitting the form, the mutate() function from React Query (which we mocked) was called once, and it was called with the correct form data — exactly what your onSubmit should send.
await waitFor(() =>
  expect(mockMutate).toHaveBeenCalledWith({email:"myemail123@gmail.com",password:"***...."})
)


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
  expect(mockedAxios.post).toHaveBeenCalledWith("https://saasprojectrivisionbackend.onrender.com/api/login",payload)

      // Did login() return the fake data we expected?
  expect(response).toEqual(fakeResponse.data)


  })

  // //  Second test — failed login
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


test('routing-after-login',async()=>{

const fakeResponse={
 success: true,
 msg: "success",
  userId:"abc123",
  token:"1234abcd"
}

render(
  <QueryClientProvider client={queryClient}>
    <LoginForm/>
  </QueryClientProvider>
)

  const mutationConfig = (useMutation as jest.Mock).mock.calls[0][0];
    mutationConfig.onSuccess(fakeResponse);


await waitFor(()=>{
  expect(mockSetToken).toHaveBeenCalledWith("1234abcd");
  expect(mockSetUserId).toHaveBeenCalledWith("abc123");
  expect(toast.success).toHaveBeenCalledWith("success");
  expect(mockPush).toHaveBeenCalledWith("/dashboard")

})

    })


})






