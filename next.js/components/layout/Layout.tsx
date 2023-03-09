
import Head from 'next/head';
import React from 'react'
import Navbar from '../Navbar';

interface PropType {
    children: React.ReactNode
}
import AuthProvider from '@/context/authContext';
const Layout = ({children}:PropType) => {
  return (
    <>
        <AuthProvider>
        <Head>
        <title>Nest.js</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </Head>
    <Navbar/>
    {children}
        </AuthProvider>
    </>
  )
}

export default Layout;