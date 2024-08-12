import { useState } from "react";
import { IComment } from "../types/comments";
import CommentCreation from "./CommentCreation";
import Comment from "./Comment";

interface ICommentProps {
  comment: IComment;
  insertComment: any;
}

const CommentContainer = ({ comment, insertComment }: ICommentProps) => {
  const [hideReply, setHideReply] = useState<boolean>(true);

  const handleHideReply = () => {
    setHideReply((prevHideReply) => !prevHideReply);
  };

  return (
    <div className="flex flex-col gap-2 p-2 border border-[#646464] rounded-md bg-[#c4e6fc]">
      <Comment handleHideReply={handleHideReply} comment={comment} hideReply={hideReply} />

      {!hideReply && (
        <>
          <CommentCreation insertComment={insertComment} commentId={comment?.id} />
          <div className="px-10 py-2 flex gap-2 flex-col">
            {comment?.replies?.map((reply: any) => (
              <div key={reply.id} className="border border-[#646464] p-2 rounded-lg">
                <p className="text-[1rem] font-bold">{reply.content}</p>
                <p className="text-sm font-medium">{reply.votes}</p>
                <p className="text-sm font-medium">{new Date(reply.timestamp)?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentContainer;
