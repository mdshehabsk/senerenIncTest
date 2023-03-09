import React,{useEffect, useState} from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Axios from '@/axios/axios.interceptor'
const Edit = () => {
  const router = useRouter()
  const [article, setArticle] = useState({
    title: "",
    body: "",
  });
  const apicall = async (index:string | string[]) => {
    try {
      const res = await Axios.get(`/article/${index}`)
      setArticle({
        title:res?.data?.title,
        body:res?.data?.body
      })
    } catch (error) {
      console.log(error)
    }
  }
  const {index} = router.query
  useEffect(()=> {
    if(index){
      apicall(index)
    }
  },[router])
  const inputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };
  const articleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const res = await Axios.patch(`/article/${index}`,article)
      toast.success(res?.data?.message)
    } catch (error:any) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  }
  const {title,body} = article
  return (
    <div className="container flex justify-between mt-20 ">
    <Toaster position="top-left" />
    <div className="max-w-[700px] bg-white p-8  mx-auto ">
      <form onSubmit={articleSubmit} >
        <h1 className="text-2xl font-medium my-2 ">Edit The Article</h1>
        <div className=" py-2 input_field w-full flex flex-col gap-2">
          <label htmlFor="title">Enter Article title</label>
          <input
            className=" px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
            type="text"
            id="title"
            placeholder="Enter Article title"
            name="title"
            onChange={inputChange}
            value={title}
          />
        </div>
        <div className="input_field w-full flex flex-col gap-2">
          <label htmlFor="body">Enter Article description</label>
          <textarea
            className=" resize-none px-3 py-2 w-[400px] outline-none border-[1px] border-slate-600 block"
            rows={7}
            id="body"
            placeholder="Enter Article description"
            name="body"
            onChange={inputChange}
            value={body}
          ></textarea>
        </div>
        <div className="input_field w-full ">
          <input
            className="px-4 py-2 bg-green-600 text-white my-2 cursor-pointer "
            type="submit"
            value="update"
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default Edit