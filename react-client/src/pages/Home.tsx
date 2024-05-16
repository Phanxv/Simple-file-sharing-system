import { useContext, useState } from "react";
import { RootContext } from "./Root";
const Home = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user } = context;

  return (
    <div className="hero-image">
      <div className="hero-text">
        Hello, {user ? user : "please log in."}
        <br />
        🏠 Home -- Under Construction 🚧</div>
    </div>
  );
};

export default Home;
