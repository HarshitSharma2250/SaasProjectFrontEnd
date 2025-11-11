import keyMatrix from "@/services/dashboardServices";
import axios from "axios";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("testing-topPerforming-users ",()=>{

beforeEach(()=>{
    jest.clearAllMocks()
});

test("call api ",async()=>{  
const mockData={
    success:true,
    totalUser:1223,
    newUser:324,
    activeCount:1,
    totalRevenue:22
};

mockedAxios.get.mockResolvedValueOnce(mockData);

const token = "mockedToken123";
const res = await keyMatrix(token);

expect(mockedAxios.get).toHaveBeenCalledTimes(1);
expect(mockedAxios.get).toHaveBeenCalledWith(`https://saasprojectrivisionbackend.onrender.com/api/keyMatrics`,{ headers: {
      Authorization: `Bearer ${token}`,
    },
});
expect(res).toEqual(mockData.data);

})

})



