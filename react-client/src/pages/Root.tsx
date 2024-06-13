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
  posts: PostInterface[] | null;
  setPosts: React.Dispatch<React.SetStateAction<PostInterface[] | null>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PostInterface {
  originalName: string;
  postName: string;
  postAuthor: string;
  timeStamp: string;
  fileType: string;
  _id : string; 
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
  const [token, setToken] = useState<string | null>(fetchsessionStorage());
  const [user, setUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [refetch, setRefetch] = useState<boolean>(true);
  const contextValue: RootContextType = {
    user,
    setUser,
    token,
    setToken,
    posts,
    setPosts,
    refetch,
    setRefetch,
  };

  useEffect(() => {
    sessionStorage.setItem("token", (token || "").toString());
    if (token) {
      setUser(jwtDecode<TokenInterface>(token).username);
      console.log(`Username set from token : ${token}`);
    }
  }, [token]);

  useEffect(() => {
    if (refetch == true) {
      const url = "http://" + window.location.hostname + ":3000/database/posts";

      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          console.log(data);
          setRefetch(false)
        });
    }
  }, [refetch]);
  console.log(`refetch : ${refetch}`)
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
