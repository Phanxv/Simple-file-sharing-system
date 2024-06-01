import React from "react";
import FileIconWrapper from "./FileIconWrapper";
import { FileIcon, defaultStyles } from "react-file-icon";

interface FileIconProps {
    fileType: string;
    fileTitle: string;
}

const FileDisplay = (props:FileIconProps) => {
  return (
    <div className="file-item">
      <div className="file-icon">
        <FileIconWrapper fileType={props.fileType}></FileIconWrapper>
      </div>
      <div className="file-title">File Title : {props.fileTitle}</div>
    </div>
  );
};

export default FileDisplay;
