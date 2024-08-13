import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (parentId: number | null, content: string) => void;
  parentId?: number | null;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, parentId = null }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(parentId, content);
      setContent("");
    }
  };

  return (
    <div className="flex gap-3">
      <textarea className="border border-[#646464] p-2" cols={50} rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Add Comment</button>
    </div>
  );
};

export default CommentForm;
