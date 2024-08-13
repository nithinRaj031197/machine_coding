import { IComment } from "../types/comments";
import useComments from "../hooks/useCommentTree";
import CommentCreation from "./CommentCreation";
import CommentContainer from "./CommentContainer";

interface INestedCommentsProps {
  comments: IComment[];
  // onSubmit: () => void;
  // onEdit: () => void;
  // onUpVote: () => void;
  // onDownVote: () => void;
  // onDelete: () => void;
}

const NestedComments = ({ comments: initialComments }: INestedCommentsProps) => {
  const { comments, insertComment } = useComments({ initialComments });

  return (
    <div className="flex flex-col gap-4 items-start p-4 border border-[#eeeeee] rounded-lg shadow-md h-[93vh] w-[50vw]">
      <CommentCreation insertComment={insertComment} commentId={null} />

      <div className="flex flex-col gap-2 overflow-x-scroll">
        {comments?.map((comment: IComment) => {
          return <CommentContainer comment={comment} insertComment={insertComment} />;
        })}
      </div>
    </div>
  );
};

export default NestedComments;
