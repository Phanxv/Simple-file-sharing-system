import React from "react";
import FileIconWrapper from "./FileIconWrapper";

interface FileIconProps {
  fileType: string;
  fileTitle: string;
  timeStamp: string;
  fileAuthor: string;
}

const FileDisplay = (props: FileIconProps) => {
  const timeObj = new Date(props.timeStamp);
  return (
    <div className="card">
      <div className="icon">
        <FileIconWrapper fileType={props.fileType}></FileIconWrapper>
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
