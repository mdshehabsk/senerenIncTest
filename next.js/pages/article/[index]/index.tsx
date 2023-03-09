import Axios from "@/axios/axios.interceptor";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const Article = () => {
  //@ts-ignore
  const {verify} = useContext(AuthContext)
  const [comment, setComment] = useState("");
  const [singleArticle, setSingleArticle] = useState<any>(null);
  const router = useRouter();
  const apicall = async (index: any) => {
    try {
      const res = await Axios.get(`/article/${index}`);
      setSingleArticle(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const { index } = router.query;
  useEffect(() => {
    if (index) {
      apicall(index);
    }
  }, [router]);

  // comment change
  const commentChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };
  const commentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await Axios.post(`/article/${index}/comment`, {
        content: comment,
      });
      if(res.status === 201) {
        apicall(index)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  };
  const deleteComment = async (id: string) => {
    try {
      const res = await Axios.delete(`/article/${index}/${id}`)
      toast.success(res?.data?.message)
      if(res.status === 200) {
        apicall(index)
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }
  };
  console.log(singleArticle)
  return (
    <>
      <div className="container">
        <Toaster position="top-left" />
        <div className="mx-auto max-w-[700px] mt-8">
          <header className="bg-white  p-4  ">
            <h4 className="font-semibold">
              Author: {singleArticle?.author?.name}
            </h4>
            <p>
              {singleArticle?.date} | {singleArticle?.time}
            </p>
          </header>
          <main className="mt-2 bg-white p-4 ">
            <h1 className="text-2xl"> {singleArticle?.title} </h1>
            <p> {singleArticle?.body} </p>
          </main>
          <div className=" mt-12 ">
            <form onSubmit={commentSubmit} className="flex flex-col gap-2">
              <label className="my-2" htmlFor="comment">
                Enter a comment
              </label>
              <textarea
                className=" outline-none focus:ring-1 focus:ring-green-400 w-full px-4 py-2 resize-none"
                name="comment"
                id="comment"
                placeholder="Type comment"
                onChange={commentChange}
                value={comment}
              ></textarea>
              <button
                className="px-8 py-2 bg-green-700 text-white "
                type="submit"
              >
                Comment
              </button>
            </form>
          </div>
          <div className="all-comment my-10">
            {singleArticle?.comment?.map((comment: any, i: number) => (
              <div key={i} className="px-4 my-2 py-2 bg-white relative ">
                <h2 className="font-semibold">{comment?.author?.name}</h2>
                <p>{comment.content}</p>
                {
                  (comment?.author?._id === verify?.id || singleArticle?.author?._id === verify?.id || verify?.role === 'admin') && <div
                  onClick={() => deleteComment(comment._id)}
                  className="absolute right-0 top-2"
                >
                  <i className="cursor-pointer text-red-600 text-[20px] bx bx-trash"></i>
                </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
