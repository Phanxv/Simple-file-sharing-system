import React, { useState } from "react";
import FileIconWrapper from "./FileIconWrapper";
import DownloadLogo from "../assets/cloud-computing-100px.png";

interface FileIconProps {
  fileType: string;
  fileTitle: string;
  timeStamp: string;
  fileAuthor: string;
}

const FileDisplay = (props: FileIconProps) => {
  const [hover, setHover] = useState(false);
  const timeObj = new Date(props.timeStamp);
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
        onClick={() => {
          console.log(`Requested download : ${props.fileTitle}`)
        }}
      >
        {hover ? <img src={DownloadLogo}/> : <FileIconWrapper fileType={props.fileType} />}
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
