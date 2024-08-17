import { useEffect, useState } from "react";
import { IComment } from "../types/comments";

type InsertNode = (tree: IComment[], commentId: number, content: IComment) => IComment[];
export type InsertComment = (commentId: number | null, content: string) => void;
type EditNode = (tree: IComment[], nodeId: number, content: string) => IComment[];
export type EditComment = (commentId: number, content: string) => void;
type DeleteNode = (tree: IComment[], nodeId: number) => IComment[];
export type DeleteComment = (commentId: number) => void;
type UpVoteNode = (tree: IComment[], commentId: number) => IComment[];
export type UpVoteComment = (commentId: number) => void;
type DownVoteNode = (tree: IComment[], commentId: number) => IComment[];
export type DownVoteComment = (commentId: number) => void;

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
          replies: [content, ...comment.replies],
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

  const upVoteNode: UpVoteNode = (tree, commentId) => {
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          votes: node.votes + 1,
        };
      } else if (node.replies && node.replies?.length > 0) {
        return {
          ...node,
          replies: upVoteNode(node.replies, commentId),
        };
      }
      return node;
    });
  };

  const upVoteComment: UpVoteComment = (commentId) => {
    setComments((prevComments) => upVoteNode(prevComments, commentId));
  };

  const downVoteNode: DownVoteNode = (tree, commentId) => {
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          votes: node.votes - 1,
        };
      } else if (node.replies && node.replies?.length > 0) {
        return {
          ...node,
          replies: downVoteNode(node.replies, commentId),
        };
      }
      return node;
    });
  };

  const downVoteComment: DownVoteComment = (commentId) => {
    setComments((prevComments) => downVoteNode(prevComments, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    upVoteComment,
    downVoteComment,
  };
};

export default useCommentTree;
