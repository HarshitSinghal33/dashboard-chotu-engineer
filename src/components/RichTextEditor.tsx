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
  const isInitialized = useRef(false);

  useEffect(() => {
    if (quill && !isInitialized.current && value) {
      quill.clipboard.dangerouslyPasteHTML(value || "");
      isInitialized.current = true;
    }
  }, [quill, value]);

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
    <div className="container mx-auto overflow-auto h-[60vh] border rounded-lg shadow-xl">
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;
