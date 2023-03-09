import Axios from "@/axios/axios.interceptor"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SingleArticle from "./SingleArticle"


const Article = () => {
  const router = useRouter()
  const {page} = router.query
  const [article,setArticle ] = useState<any | null>(null)
  const articleFetch  = async () => {
    try {
      if(!page){
        const res = await Axios.get(`/article/?page=${0}`)
        setArticle(res.data.allArticle)
      }
      if(page){
        console.log(page)
        const res = await Axios.get(`/article/?page=${page}`)
      setArticle(res.data.allArticle)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    
      articleFetch()
    
  },[router,page])
  return (
    <>
    <div className="container mx-auto mt-8  px-2 md:px-0  ">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
    {
      article?.map((elem:any,i:number)=> <SingleArticle key={i} article={elem} articleFetch={articleFetch} /> )
    }
    </div>
    </div>
    </>
  )
}

export default Article