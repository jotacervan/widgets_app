import React, { useState, createContext } from "react";

export const MainContext = createContext({});

export default function MainProvider({ children, loggedIn }) {
  const [logged, setLogged] = useState(loggedIn)
  const [user, setUser] = useState({})

  return (
    <MainContext.Provider value={[logged, setLogged]}>
      {children}
    </MainContext.Provider>
  );
}
