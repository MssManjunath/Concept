import React, { useEffect, useRef,useState } from "react";
import JoditEditor from "jodit-react"; // Correct default import
import { useLocation } from "react-router-dom";

const TextEditor = () => {

  const [currentNote,setCurrentNote] = useState({})
  const location = useLocation();

  useEffect( ()=>{  
    setCurrentNote(location.state)
  },[location])

  const editor = useRef(null);

  const config = {
    readonly: false,
    height: "100vh",
    toolbarSticky: false,
  };

  const handleEditorChange = (newContent) => {
    console.log("Editor content:", newContent);
  };

  return (
    <div className="text-editor-container">
      <JoditEditor
        ref={editor}
        value={currentNote?.html_content}
        config={config}
        onBlur={handleEditorChange}
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default TextEditor;
