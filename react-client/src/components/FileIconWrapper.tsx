import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

interface FileIconWrapperProps {
  fileType: string;
}

const FileIconWrapper = (props: FileIconWrapperProps) => {
  switch (props.fileType) {
    case ".png":
    case ".jpeg":
    case ".jpg":
    case ".tif":
    case ".tiff":
    case ".bmp":
    case ".gif":
      return <FileIcon extension={props.fileType} type="image"></FileIcon>;
    case ".mp4":
    case ".mov":
    case ".avi":
    case ".mkv":
    case ".flv":
    case ".wmv":
    case ".webm":
      return <FileIcon extension={props.fileType} type="video"></FileIcon>;
    case ".zip":
    case ".rar":
    case ".7z":
    case ".tar":
    case ".gz":
    case ".bz2":
      return <FileIcon extension={props.fileType} type="compressed"></FileIcon>;
    case ".js":
    case ".jsx":
    case ".ts":
    case ".tsx":
    case ".html":
    case ".css":
    case ".scss":
    case ".py":
    case ".java":
    case ".json":
    case ".c":
    case ".cpp":
    case ".cs":
    case ".php":
    case ".rb":
    case ".go":
    case ".rs":
    case ".swift":
    case ".kt":
      return <FileIcon extension={props.fileType} type="code"></FileIcon>;
    case ".json":
    case ".xml":
    case ".yml":
    case ".yaml":
    case ".ini":
    case ".conf":
    case ".config":
    case ".env":
      return <FileIcon extension={props.fileType} type="settings"></FileIcon>;
    case ".pdf":
      return (
        <FileIcon extension={props.fileType} {...defaultStyles.pdf}></FileIcon>
      );
    case ".apk":
    case ".exe":
    case ".bin":
      return <FileIcon extension={props.fileType} type="binary"></FileIcon>;
    default:
      return <FileIcon extension={props.fileType}></FileIcon>;
  }
};

export default FileIconWrapper;
