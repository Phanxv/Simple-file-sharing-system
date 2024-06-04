import React, { useState, createContext, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CookiesProvider } from "react-cookie";
import { jwtDecode } from "jwt-decode";

interface RootContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TokenInterface {
  username: string;
  exp: number;
}
export const RootContext = createContext<RootContextType | undefined>(
  undefined
);

const fetchsessionStorage = () => {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
};

const Root = () => {
  const [token, setToken] = useState<string | null>(fetchsessionStorage())
  const [user, setUser] = useState<string | null>(null);
  
  const contextValue: RootContextType = {
    user,
    setUser,
    token,
    setToken
  };

  useEffect(() => {
    sessionStorage.setItem("token", (token || "").toString());
    if(token) { setUser(jwtDecode<TokenInterface>(token).username); console.log(`Username set from token : ${token}`)}
  }, [token]);

  console.log(user);
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RootContext.Provider value={contextValue}>
        <Navbar />
        <Outlet />
      </RootContext.Provider>
    </CookiesProvider>
  );
};

export default Root;
