"use client";
import React, { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({ placeholder: "Start typing here..." });
  const isInitialized = useRef(false); // Track if Quill is initialized

  // Initialize Quill with the initial value
  useEffect(() => {
    console.log(value, 'outside');
    
    if (quill && value) {
      console.log(value, 'inside');
      quill.clipboard.dangerouslyPasteHTML(value || ""); // Set initial value
    //   isInitialized.current = true; // Mark as initialized
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const deltaOps = quill.getContents().ops; // Get Delta operations
        const converter = new QuillDeltaToHtmlConverter(deltaOps, {}); // Convert Delta to HTML
        const html = converter.convert();
        onChange(html);
      });
    }
  }, [quill, onChange]);

  return (
    <div className="container mx-auto h-[86vh]">
      <div className="border rounded-lg shadow-xl overflow-hidden h-full">
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default RichTextEditor;
