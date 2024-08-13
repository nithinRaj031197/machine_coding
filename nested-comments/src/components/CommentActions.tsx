import React from "react";

interface CommentActionsProps {
  onEdit: (content: string) => void;
  onDelete: () => void;
  onReply: (content: string) => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({ onEdit, onDelete, onReply }) => {
  return (
    <div className="flex gap-4">
      <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={() => onEdit("Updated Content")}>
        Edit
      </button>
      <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={onDelete}>
        Delete
      </button>
      <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={() => onReply("Reply Content")}>
        Reply
      </button>
    </div>
  );
};

export default CommentActions;
