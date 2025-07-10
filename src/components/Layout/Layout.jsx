import React from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return <>
      <Navbar />

       <div className="container mx-auto ">
        <Outlet />
       </div>

  </>
  
}
