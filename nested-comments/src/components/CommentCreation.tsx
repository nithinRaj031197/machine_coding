import { ChangeEvent, useState } from "react";

const CommentCreation = ({
  insertComment,
  commentId,
}: {
  commentId: number | null;
  insertComment: (commentId: number | null, content: string) => void;
}) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleComments = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    insertComment(commentId, newComment);
    setNewComment("");
  };

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <textarea
        className="border border-[#d4d4d4] p-2 rounded-md"
        value={newComment}
        rows={2}
        cols={50}
        onChange={handleComments}
        placeholder="Add a New Comment..."
      />
      <button className="bg-[#0099ff] p-2 rounded-md" onClick={handleCommentSubmit}>
        Add Comment
      </button>
    </div>
  );
};

export default CommentCreation;
