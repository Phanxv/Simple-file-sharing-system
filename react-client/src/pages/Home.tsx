import { useContext, useState, useEffect } from "react";
import { RootContext } from "./Root";
import FileDisplay from "../components/FileDisplay";

interface PostInterface {
  originalName: string;
  postName: string;
  postAuthor: string;
  timeStamp: string;
  fileType: string;
}

const Home = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user } = context;

  const [posts, setPosts] = useState<PostInterface[] | null>(null);

  useEffect(() => {
    const url = "http://localhost:3000/database/posts";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, []);

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
