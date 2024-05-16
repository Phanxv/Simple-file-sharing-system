import React, { useState, createContext, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar";

interface RootContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const RootContext = createContext<RootContextType | undefined>(undefined);

const fetchsessionStorage = () => {
    const username = sessionStorage.getItem("username")
    return username ? username : null
}

const Root = () => {
  const [user, setUser] = useState<string | null>(fetchsessionStorage());
  const contextValue: RootContextType = {
    user,
    setUser,
  };

  useEffect(() => {
    sessionStorage.setItem("username", (user || "").toString());
  }, [user])
   
  console.log(user)
  return (
    <RootContext.Provider value={contextValue}>
      <Navbar />
      <Outlet />
    </RootContext.Provider>
  );
};

export default Root;
