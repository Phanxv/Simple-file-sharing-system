import React, { useContext, useState } from "react";
import FileIconWrapper from "./FileIconWrapper";
import DownloadLogo from "../assets/cloud-computing-100px.png";
import { RootContext } from "../pages/Root";
import { blob } from "stream/consumers";

interface FileIconProps {
  fileType: string;
  fileTitle: string;
  fileId: string;
  timeStamp: string;
  fileAuthor: string;
  fileName: string;
}

const FileDisplay = (props: FileIconProps) => {
  const context = useContext(RootContext);
  const user = context?.user;
  const token = context?.token;
  const [hover, setHover] = useState(false);
  const timeObj = new Date(props.timeStamp);
  const handleDownload = async () => {
    console.log(`Requested download : ${props.fileTitle}`);
    try {
      const response = await fetch(
        "http://" +
          window.location.hostname +
          ":3000/storage/" +
          `${props.fileId}/?token=${token}`
      );
      const blob = await response.blob(); // Get the response as a Blob
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", props.fileName); // Set the file name
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="card">
      <div
        className="icon"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={handleDownload}
      >
        {hover ? (
          <img src={DownloadLogo} />
        ) : (
          <FileIconWrapper fileType={props.fileType} />
        )}
      </div>
      <div className="text">
        Title : {props.fileTitle}
        <p>{timeObj.toLocaleString()}</p>
        <p>by : {props.fileAuthor}</p>
      </div>
    </div>
  );
};

export default FileDisplay;
