import TopPerformingUsers from "@/components/sections/TopPerformingUsers";
import { useAuthStore } from "@/config/zustand/loginStore";
import { UserRevinueData } from "@/services/dashboardServices";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import axios from "axios";


const queryClient = new QueryClient();



jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;


jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useQuery: jest.fn(),
  };
});



jest.mock("@/config/zustand/loginStore",()=>({
    useAuthStore:jest.fn()
}))


describe("users-related-data", () => {
 const token = jest.fn()



beforeEach(() => {
        jest.clearAllMocks();

     (useAuthStore as unknown as jest.Mock).mockReturnValue({
        token: token,
      });

    })

test("get-all-users-data", async () => {

        const mockData = {
            success: true,
            data: [{
                id: 123,
                name: "hello",
                email: "hello123@gmail.com",
                revenue: 12
            }]
        };

        mockedAxios.get.mockResolvedValue(mockData)

        const token = "mockedToken123";
        const res = await UserRevinueData(token)

        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        expect(mockedAxios.get).toHaveBeenLastCalledWith(`https://saasprojectrivisionbackend.onrender.com/api/userData`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        expect(res).toEqual(mockData.data.data)

    })




test("check pdf-button",()=>{

  (useQuery as jest.Mock).mockReturnValue({
    data: [{ name: "A", email: "a@gmail.com", revenue: 12 }],
    isLoading: false,
    error: null,
  });
render(
    <QueryClientProvider client={queryClient}>
        <TopPerformingUsers/>
    </QueryClientProvider>
);

let res=screen.getByTestId("pdfGenerator");
expect(res).toBeInTheDocument();

})




})