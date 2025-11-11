// __tests__/register.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterFormComponent from "@/components/forms/RegisterForm";
import { register } from "@/services/authenticationFOrms";
import { useAuthStore } from "@/config/zustand/loginStore";
import { useRouter } from "next/navigation";

// Setup QueryClient
const queryClient = new QueryClient();

//  Mock external modules
jest.mock("axios");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return { ...original, useMutation: jest.fn() };
});  //partial mock 

jest.mock("@/config/zustand/loginStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// Axios mock
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Register Form", () => {
  const mockPush = jest.fn();
  const mockSetToken = jest.fn();
  const mockSetUserId = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Return mocks cleanly here
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
      setUserId: mockSetUserId,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  test("renders all input fields and button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterFormComponent />
      </QueryClientProvider>
    );

    const placeholders = [
      "myemail123@gmail.com",
      "write your name",
      "enter your age",
      "enter your mobile number",
      "***....",
    ];

    placeholders.forEach((text) =>
      expect(screen.getByPlaceholderText(text)).toBeInTheDocument()
    );

    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });


  test("test-input fileds with values and submit button clicked with all data", async () => {

    render(
      <QueryClientProvider client={queryClient}>
        <RegisterFormComponent />
      </QueryClientProvider>
    )

    let arr = [
      {
        testId: "registerName",
        value: "harshit"
      },
      {
        testId: "registerName",
        value: "harshit"
      },
      {
        testId: "registerEmail",
        value: "sharma.harshit295@gmail.com"
      },
      {
        testId: "registerAge",
        value: 22
      },
      {
        testId: "registerNumber",
        value: 9999999999
      },
      {
        testId: "registerPassword",
        value: 2123223
      },
      {
        testId: "gender-select",
        value: "male"
      },
    ]


    arr.forEach((ele) => {
      const FieldName = screen.getByTestId(ele.testId)
      fireEvent.change(FieldName, {
        target: { value: ele.value }
      })
    })

    const buttonCheck = screen.getByRole("button", { name: /Register/i });


    fireEvent.click(buttonCheck)

    await waitFor(() => expect(mockMutate).toHaveBeenCalledWith({
      name: "harshit",
      email: "sharma.harshit295@gmail.com",
      age: "22",
      number: "9999999999",
      password: "2123223",
      gender: "male"
    }))

  })

  test("calls API successfully", async () => {
    const fakeResponse = { data: { message: "registration done" } };
    mockedAxios.post.mockResolvedValueOnce(fakeResponse);

    const payload = {
      name: "harshit",
      email: "harshit295@gmail.com",
      age: 22,
      number: 1111111111,
      gender: "male",
    };

    const result = await register(payload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://saasprojectrivisionbackend.onrender.com/api/register",
      payload
    );
    expect(result).toEqual(fakeResponse.data);
  });

  test("handles API failure", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("invalid data"));
    const payload = {
      name: "harshit",
      email: "harshit295@gmail.com",
      age: 22,
      number: 1111111111,
      gender: "male",
    };

    await expect(register(payload)).rejects.toThrow("invalid data");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  test("navigates to dashboard after successful register", async () => {
    const fakeResponse = {
      token: "abcd123",
      success: true,
      msg: "success",
      userId: "123efw",
    };

    render(
      <QueryClientProvider client={queryClient}>
        <RegisterFormComponent />
      </QueryClientProvider>
    );

    const mutationConfig = (useMutation as jest.Mock).mock.calls[0][0];
    mutationConfig.onSuccess(fakeResponse);

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith("abcd123");
      expect(mockSetUserId).toHaveBeenCalledWith("123efw");
      expect(toast.success).toHaveBeenCalledWith("success");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
