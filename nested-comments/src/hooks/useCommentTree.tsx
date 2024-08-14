import { useEffect, useState } from "react";
import { IComment } from "../types/comments";

type InsertNode = (tree: IComment[], commentId: number, content: IComment) => IComment[];
export type InsertComment = (commentId: number | null, content: string) => void;
type EditNode = (tree: IComment[], nodeId: number, content: string) => IComment[];
type EditComment = (commentId: number, content: string) => void;
type DeleteNode = (tree: IComment[], nodeId: number) => IComment[];
type DeleteComment = (commentId: number) => void;

const useCommentTree = ({ initialComments }: { initialComments: IComment[] }) => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const insertNode: InsertNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const insertComment: InsertComment = (commentId, content) => {
    const newComment: IComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId !== null) {
      setComments((prevComments) => insertNode(prevComments, commentId, newComment));
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editNode: EditNode = (tree, nodeId, content) => {
    return tree.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          content: content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: editNode(node.replies, nodeId, content),
        };
      }
      return node;
    });
  };

  const editComment: EditComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode: DeleteNode = (tree, nodeId) => {
    return tree.reduce((acc, node) => {
      if (node.id === nodeId) {
        return acc;
      } else if (node.replies && node.replies.length > 0) {
        node.replies = deleteNode(node.replies, nodeId);
      }
      return [...acc, node];
    }, [] as IComment[]);
  };

  const deleteComment: DeleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
