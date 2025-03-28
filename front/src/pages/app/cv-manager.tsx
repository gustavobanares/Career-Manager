import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import html2pdf from "html2pdf.js";

interface CVManagerProps {
  userId?: string;
  onSave?: (content: string) => void;
}

const CVManager: React.FC<CVManagerProps> = ({ userId, onSave }) => {
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<ReactQuill>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Quill.js configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  // Export to PDF function with rich text preservation
  const exportToPDF = () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: 1,
      filename: `cv-${userId || "document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    // Convert the HTML to PDF
    html2pdf().set(opt).from(element).save();
  };

  // Handle CV Save
  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <div className="cv-manager">
      <div ref={contentRef}>
        <ReactQuill
          ref={editorRef}
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Start building your CV here..."
          className="h-[600px]"
        />
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save CV
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default CVManager;
