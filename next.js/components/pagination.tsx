import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
const Pagination = () => {
  const router = useRouter();
  //@ts-ignore
  let page = parseInt(router.query.page || '0', 10);
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex gap-4">
          {page > 0 && (
           <Link href={`/?page=${page - 1}`} >
            <button
              className="bg-green-700 px-8 py-2 text-white"
            >
              Prev
            </button>
           </Link>
          )}
          <Link href={`/?page=${page + 1}`} >
          <button
            className="bg-green-700 px-8 py-2 text-white"
          >
            Next
          </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Pagination;
