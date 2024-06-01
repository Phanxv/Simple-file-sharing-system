import { useContext, useState, useEffect } from "react";
import { RootContext } from "./Root";
import FileDisplay from "../components/FileDisplay";

const Home = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user } = context;

  useEffect(() => {
    const url = "http://localhost:3000/database/posts";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="hero-text">Logged in as : {user ? user : "Not logged in yet"}</div>
        <FileDisplay fileTitle="test-1" fileType=".ini"/>
        <FileDisplay fileTitle="test-2" fileType=".pdf"/>
      </div>
    </>
  );
};

export default Home;
