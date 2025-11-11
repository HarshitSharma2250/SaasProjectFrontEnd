export interface formData{
    formik:any;
    type:string;
    placeholder:string;
    value:string|number;
    className:string;
      [key: string]: any; 
      options?: { label: string; value: string | number }[]; 
      name:string;
}



export interface registerFormValidation{
 email: string;
  name: string;
  number: string;
 gender: "male" | "female" | "other";
    age:number;
   password: string;
   
}

export interface registerResponse extends registerFormValidation{
      token:string;
   userId:string;
   message:string;
   msg:string
}
 

export interface LoginFormValidation{
   email:string;
   password:string;
   token:string;
   userId:string;
   msg?:string;
}

// for initial login values-----------------------------------------------
export interface LoginFormValues{
  email: string;
  password: string;
};

export interface matrixResponse{
   success:string;
   totalUser:number;
   newUser:number;
   activeCount:number;
   totalRevenue:number;
}

export interface revenueUser{
   _id:string;
   name:string;
   email:string;
   revenue:number;
}