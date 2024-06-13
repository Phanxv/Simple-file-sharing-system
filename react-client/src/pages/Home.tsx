import { useContext, useState, useEffect } from "react";
import { RootContext } from "./Root";
import FileDisplay from "../components/FileDisplay";

const Home = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user, posts } = context;

  

  return (
    <>
    <div className="hero-text">
      Hello, {user}
    </div>
      <div className="card-grid">
        {posts ? (
          posts.map((post, index) => (
            <div key={index}>
              <FileDisplay
                fileTitle={post.postName}
                fileType={post.fileType}
                timeStamp={post.timeStamp}
                fileAuthor={post.postAuthor}
                fileId={post._id}
                fileName={post.originalName}
              ></FileDisplay>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default Home;
