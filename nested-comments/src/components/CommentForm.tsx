import { ChangeEvent, useState } from "react";
import { InsertComment } from "../hooks/useCommentTree";

interface ICommentForm {
  insertComment: InsertComment;
  contentId?: number | null;
}

const CommentForm = ({ insertComment, contentId = null }: ICommentForm) => {
  const [newComment, setNewComment] = useState("");

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const addComment = (commentId: null | number, content: string) => {
    insertComment(commentId, content);
    setNewComment("");
  };
  return (
    <div className="flex gap-3">
      <textarea value={newComment} className="border border-[#646464] p-2" cols={50} rows={3} onChange={handleNewCommentChange}></textarea>
      <button onClick={() => addComment(contentId, newComment)}>Add Comment</button>
    </div>
  );
};

export default CommentForm;
