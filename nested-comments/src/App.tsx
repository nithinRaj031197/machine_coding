import { ChangeEvent, useEffect, useState } from "react";
import { IComment } from "./types/comments";
import { fetchComments } from "./api/comments";
import useCommentTree, { DeleteComment, DownVoteComment, EditComment, InsertComment, UpVoteComment } from "./hooks/useCommentTree";
import CommentForm from "./components/CommentForm";

function App() {
  const [initialComments, setInitialComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { comments, insertComment, deleteComment, editComment, upVoteComment, downVoteComment } = useCommentTree({ initialComments });

  useEffect(() => {
    setLoading(true);
    const getComments = async () => {
      try {
        const data = await fetchComments();
        setInitialComments(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments: {error?.message}</p>;

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <h1 className="text-center text-2xl font-bold">Nested Comment System</h1>
      <div className="p-4 shadow-md h-[90vh] w-[50vw] overflow-scroll flex flex-col gap-2">
        <CommentForm insertComment={insertComment} />
        <CommentList
          comments={comments}
          insertComment={insertComment}
          deleteComment={deleteComment}
          editComment={editComment}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
        />
      </div>
    </div>
  );
}

const CommentList = ({
  comments,
  insertComment,
  deleteComment,
  editComment,
  upVoteComment,
  downVoteComment,
}: {
  comments: IComment[];
  insertComment: InsertComment;
  deleteComment: DeleteComment;
  editComment: EditComment;
  upVoteComment: UpVoteComment;
  downVoteComment: DownVoteComment;
}) => {
  return (
    <section className="flex flex-col gap-2">
      {comments?.map((comment: IComment) => (
        <Comment
          key={comment.id}
          comment={comment}
          insertComment={insertComment}
          deleteComment={deleteComment}
          editComment={editComment}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
        />
      ))}
    </section>
  );
};

const Comment = ({
  comment,
  insertComment,
  deleteComment,
  editComment,
  upVoteComment,
  downVoteComment,
}: {
  comment: IComment;
  insertComment: InsertComment;
  deleteComment: DeleteComment;
  editComment: EditComment;
  upVoteComment: UpVoteComment;
  downVoteComment: DownVoteComment;
}) => {
  const [expand, setExpand] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [updatedValue, setUpdatedValue] = useState(comment?.content);

  const handleUpdateCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 border border-[#646464] p-2 rounded-lg">
      {isEditMode ? (
        <div className="flex gap-3">
          <textarea value={updatedValue} className="border border-[#646464] p-2" cols={50} rows={3} onChange={handleUpdateCommentChange}></textarea>
          <button
            onClick={() => {
              editComment(comment?.id, updatedValue);
              setIsEditMode(false);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <p>{comment.votes}</p>
          <p>{new Date(comment.timestamp)?.toLocaleString()}</p>
        </div>
      )}
      <div className="flex gap-4">
        <button className="bg-[#0099ff] p-1 min-w-[3rem] rounded-md text-xl" onClick={() => upVoteComment(comment?.id)}>
          👍
        </button>
        <button className="bg-[#0099ff] p-1 min-w-[3rem] rounded-md text-xl" onClick={() => downVoteComment(comment?.id)}>
          👎
        </button>
        <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={() => setExpand(!expand)}>
          {expand ? "Hide Reply" : "Reply"}
        </button>
        <button
          className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          Edit
        </button>
        <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={() => deleteComment(comment?.id)}>
          Delete
        </button>
      </div>
      {expand && (
        <div className="p-4 flex flex-col gap-2 m-2">
          <CommentForm insertComment={insertComment} contentId={comment.id} />
          <CommentList
            comments={comment.replies || []}
            insertComment={insertComment}
            deleteComment={deleteComment}
            editComment={editComment}
            upVoteComment={upVoteComment}
            downVoteComment={downVoteComment}
          />
        </div>
      )}
    </div>
  );
};

export default App;
