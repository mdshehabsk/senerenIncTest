import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import Axios from '@/axios/axios.interceptor'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';
import Link from 'next/link';

interface propTypes {
  article : {
    title:string,
  body:string,
  date:string,
  time:string,
  _id:string,
  author:{
    _id:string,
  }
  },
  articleFetch : Function
}

const SingleArticle = ({article,articleFetch}:propTypes) => {
  const router = useRouter()
const [verify,setVerify] = useState<any>(null)
useEffect(()=> {
  try {
    const token = localStorage.getItem('seneren')
  const verify:any = jwtDecode(token || '')
  setVerify(verify)
  } catch (error) {
    return
  }
},[])
const editArticle = async (id:string) => {
  router.push(`/article/${id}/edit`)
}
const deleteArticle = async (id:string) => {
   try {
    const res = await Axios.delete(`/article/${id}/delete`)
    toast.success(res.data?.message)
    if(res.status === 200) {
      articleFetch()
    }
   } catch (error:any) {
     toast.error(error?.response?.data?.message)
   }
}
  const {title,body,date,time,_id} = article
  return (
    <>
    <div className='p-4 bg-white shadow-md' >
      <Toaster  position='top-left' />
      <Link href={`/article/${_id}`} >
      <div className="title">
        <h2 className='text-xl md:text-2xl font-semibold ' > {title?.substring(0,25)} </h2>
      </div>
      </Link>
      <div className="body">
        <p className='font-medium my-2' > {body?.substring(0,100)} </p>
      </div>
      <div className="flex justify-between ">
      <div className='date' >
        <p>{date} | {time}</p>
      </div>
      {
        ((article?.author?._id === verify?.id) || (verify?.role === 'admin') )&& <div className="flex gap-2">
        <i onClick={()=> editArticle(_id)} className='cursor-pointer text-green-600 text-[20px] bx bx-edit-alt'></i>
        <i onClick={()=> deleteArticle(_id)} className='cursor-pointer text-red-600 text-[20px] bx bx-trash'></i>
        </div>
      }
      </div>
    </div>
    </>
  )
}

export default SingleArticle