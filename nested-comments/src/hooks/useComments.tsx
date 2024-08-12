import { useState } from "react";
import { IComment } from "../types/comments";

interface IUseCommentProps {
  initialComments: IComment[];
}

const useComments = ({ initialComments }: IUseCommentProps) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);

  const addReplyToComment = (tree: IComment[], commentId: number, newReply: IComment): IComment[] => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, commentId, newReply),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId: number | null, content: string) => {
    const newComment: IComment = {
      id: Date.now(),
      content,
      timestamp: new Date()?.toISOString(),
      votes: 0,
      replies: [],
    };

    if (commentId) {
      setComments((prev) => addReplyToComment(prev, commentId, newComment));
    } else {
      setComments((prev: IComment[]) => [newComment, ...prev]);
    }
  };

  return {
    comments,
    insertComment,
  };
};

export default useComments;
