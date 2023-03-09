import React, { useState } from "react";
import Link from "next/link";
import Axios from "@/axios/axios.interceptor";
import { AxiosError } from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter()
    const [value,setValue] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    })
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
        ...value,
        [event.target.name]:event.target.value
    })
  };
  const registerSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault()
        
        const res = await Axios.post('/auth/register',value)
        toast.success(res.data.message)
        if(res.status === 201) {
          router.push('/login')
        }
        
    } catch (error:any) {
        const errMsg = error.response?.data?.message
        toast.error(errMsg)
    }
  }
  const {name,email,password,cpassword} = value
  return (
    <div className="container mx-auto mt-20">
        <Toaster position="top-right" />
      <div className="max-w-[700px] flex justify-center bg-white p-8  mx-auto ">
        <form onSubmit={registerSubmit} >
          <h1 className="text-2xl font-medium my-2 ">Register</h1>
          <div className=" py-2 input_field w-full flex flex-col gap-2">
            <label htmlFor="name">Enter Name</label>
            <input
              className=" px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
              type="text"
              id="name"
              placeholder="Enter Name"
              name="name"
              onChange={inputChange}
              value={name}
              required
            />
          </div>
          <div className=" py-2 input_field w-full flex flex-col gap-2">
            <label htmlFor="email">Enter Email</label>
            <input
              className=" px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
              type="text"
              id="email"
              placeholder="Enter Email"
              name="email"
              onChange={inputChange}
              value={email}
              required
            />
          </div>
          <div className="input_field w-full flex flex-col gap-2">
            <label htmlFor="password">Enter Password</label>
            <input
              className=" resize-none px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
              id="password"
              placeholder="Enter Password"
              name="password"
              onChange={inputChange}
              value={password}
              required
            />
          </div>
          <div className="input_field w-full flex flex-col gap-2">
            <label htmlFor="cpassword">Enter Confirm Password</label>
            <input
              className=" resize-none px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
              id="cpassword"
              placeholder="Enter Confirm Password"
              name="cpassword"
              onChange={inputChange}
              value={cpassword}
              required
            />
          </div>
          <div className="input_field w-full ">
            <input
              className="px-4 py-2 bg-green-600 text-white my-2 cursor-pointer "
              type="submit"
              value="submit"
            />
          </div>
          <div>
            <span>You have already account?</span>{" "}
            <Link className="text-rose-600" href="/login">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
