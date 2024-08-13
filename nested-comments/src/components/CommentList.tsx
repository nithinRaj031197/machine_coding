import { IComment } from "../types/comments";
import CommentActions from "./CommentActions";
import CommentForm from "./CommentForm";

const CommentList = ({
  comments,
  onEdit,
  onDelete,
  onReply,
}: {
  comments: IComment[];
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onReply: (commentId: number | null, content: string) => void;
}) => {
  return (
    <section>
      {comments?.map((comment: IComment) => (
        <div key={comment.id} className="flex flex-col gap-2">
          <div>
            <p>{comment.content}</p>
            <p>{comment.votes}</p>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
          </div>
          <CommentActions
            onEdit={(content) => onEdit(comment.id, content)}
            onDelete={() => onDelete(comment.id)}
            onReply={(content) => onReply(comment.id, content)}
          />
          <div className="p-4 shadow-md h-[90vh]">
            <CommentForm onSubmit={(_, content) => onReply(comment.id, content)} parentId={comment.id} />
            {comment.replies && <CommentList comments={comment.replies} onEdit={onEdit} onDelete={onDelete} onReply={onReply} />}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CommentList;
