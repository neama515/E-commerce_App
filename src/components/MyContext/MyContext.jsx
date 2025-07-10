import React ,{createContext, useEffect, useState}from 'react'
export let theContext=createContext()
export default function MyContext({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));


  return <theContext.Provider value={{token,setToken}}>
{children}
  </theContext.Provider>
}
