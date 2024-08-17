import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
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

  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (contentId && commentRef.current) {
      commentRef.current.focus();
      commentRef.current.select();
    }
  }, [contentId]);

  const addComment = (commentId: null | number, content: string) => {
    if (content?.trim()) {
      insertComment(commentId, content);
      setNewComment("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      if (newComment?.trim()) {
        addComment(contentId, newComment);
      }
    }
  };
  return (
    <div className="flex gap-3 items-center">
      <textarea
        ref={commentRef}
        value={newComment}
        className="border border-[#646464] p-2 rounded-md"
        cols={50}
        rows={3}
        onChange={handleNewCommentChange}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button className="bg-[#0099ff] hover:bg-[#007bff] w-[10rem] h-[3rem] rounded-lg text-white" onClick={() => addComment(contentId, newComment)}>
        Add Comment
      </button>
    </div>
  );
};

export default CommentForm;
