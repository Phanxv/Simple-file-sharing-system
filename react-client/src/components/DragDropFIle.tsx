import React, {
  useState,
  DragEvent,
  ChangeEvent,
  useRef,
  MouseEvent,
  useContext,
} from "react";
import { FileContext } from "./UploadForm";

const DragDropfiles = () => {
  const context = useContext(FileContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.dataTransfer.files);
    context?.setFiles(event.dataTransfer.files);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  if (context?.files)
    return (
      <div className="dropzone">
        <span>Selected Files</span>
        <span>
          {" "}
          {Array.from(context.files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}{" "}
        </span>
      </div>
    );

  return (
    <>
      <div className="dropzone" onDragOver={handleDrag} onDrop={handleDrop}>
        <span>Drag & Drop files to upload</span>
        <span>Or</span>
        <input
          type="file"
          ref={inputRef}
          hidden
          name="attachment"
          id="attachment"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            context?.setFiles(event.target.files)
          }
          required
        />
        <button onClick={handleClick}>Select file</button>
      </div>
    </>
  );
};

export default DragDropfiles;
