import { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
export const AuthContext = createContext(null)

const AuthProvider = ({children}:{children:React.ReactNode}) => {
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
  return (
    // @ts-ignore
    <AuthContext.Provider value={{verify}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;