import Axios from "@/axios/axios.interceptor";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
function Login() {
  const router = useRouter()
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value
    })
  };
  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
        const res = await Axios.post('/auth/login',value)
        toast.success(res.data.message)
        localStorage.setItem('seneren',(res.data?.token))
        if(res.status === 201) {
          location.href = '/'
        }
    } catch (error:any) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  };
  const { email, password } = value;
  return (
    <>
      <div className="container mx-auto mt-20">
        <Toaster position="top-left" />
        <div className="max-w-[700px] flex justify-center bg-white p-8  mx-auto ">
          <form onSubmit={loginSubmit}>
            <h1 className="text-2xl font-medium my-2 ">Login</h1>
            <div className=" py-2 input_field w-full flex flex-col gap-2">
              <label htmlFor="email">Enter Email</label>
              <input
                className=" px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
                type="text"
                id="email"
                placeholder="Enter Email"
                name="email"
                onChange={inputChange}
                required
                value={email}
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
                required
                value={password}
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
              <span>You dont have any account?</span>{" "}
              <Link className="text-rose-600" href="/register">
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
