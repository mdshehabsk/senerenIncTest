import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context/authContext'
const Navbar = () => {
    //@ts-ignore
   const {verify} = useContext(AuthContext)
   const logoutFn = () => {
    localStorage.removeItem('seneren')
    location.reload()
   }
  return (
    <>
    <nav className='flex items-center h-[80px] bg-white ' >
        <div className=" mx-auto container px-2 md:px-0 ">
            <div className="flex justify-between ">
                <div className="logo">
                    <Link className='text-2xl text-blue-500 ' href="/">Senren.inc</Link>
                </div>
                <ul className='relative group ' >
                    <li className='flex gap-2 items-center px-4 py-2 bg-slate-300 cursor-pointer rounded-t-md ' >
                    <i className=' text-[20px] bx bx-user-circle'></i> {verify && <a > {verify?.name} </a>}
                    </li>
                    <ul className=' group-hover:block hidden py-4 absolute top-9  right-[0%] w-[200px] bg-white' >
                         {
                            verify ?  <li onClick={logoutFn} className='p-2 hover:bg-slate-300 transition cursor-pointer ' >
                            Logout
                            </li>:  <Link href='/login' >
                            <li className='p-2 hover:bg-slate-300 transition  cursor-pointer' >
                                Login 
                            </li>
                                </Link>
                         }
                        <Link href='/article/create' >
                        <li className='p-2 hover:bg-slate-300 transition cursor-pointer ' >
                        Create New 
                        </li>
                        </Link>
                    </ul>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar