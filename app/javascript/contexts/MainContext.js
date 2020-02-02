import React, { useState, useEffect, createContext } from "react";

export const MainContext = createContext({});
import Loader from "@components/Loader"
import api from "@src/api"

export default function MainProvider({ children, loggedIn }) {
  const [logged, setLogged] = useState(loggedIn)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(logged){
      api.get('/api/v1/users/me').then(res => {
        setUser(res.data)
        setLoading(false)
      }).catch(res => {
        setLogged(false)
      })
    }
  }, [logged])

  return (
    <MainContext.Provider value={{logged, setLogged, user, setUser, setLoading}}>
      { loading && <Loader /> }
      {children}
    </MainContext.Provider>
  );
}
