import React, { createContext, useContext, useEffect, useState } from "react";
import DragDropFIle from "./DragDropFIle";
import { RootContext } from "../pages/Root";

interface FileContextType {
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

const UploadForm = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>("");
  const fileContext: FileContextType = { files, setFiles };
  const rootContext = useContext(RootContext);
  if (!rootContext) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user, setRefetch } = rootContext;

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setTitle(value)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files || !title) {
      return;
    }

    if(!user) {
      alert("Please Log in before uploading file.")
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", files[0]);
    formData.append("author", user);
    try {
      const response = await fetch("http://" + window.location.hostname + ":3000/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully", data);
        setRefetch(true)
        alert(data.message)
      } else {
        console.error("Error uploading file", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <FileContext.Provider value={fileContext}>
      <div className="upload-form-container">
        <div className="form">
          <header>Upload file</header>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="text"
              className="text-input"
              placeholder="Enter Upload title"
              onChange={handleTitleChange}
              required
            />
            <DragDropFIle />
            {files && (
              <input type="submit" value="Upload" className="button"></input>
            )}
            {files && (
              <input
                type="button"
                value="Cancel"
                className="button-inv"
                onClick={() => setFiles(null)}
              ></input>
            )}
          </form>
        </div>
      </div>
    </FileContext.Provider>
  );
};

export default UploadForm;
