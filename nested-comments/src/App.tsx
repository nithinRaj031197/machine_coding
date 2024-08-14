import { useEffect, useState } from "react";
import { IComment } from "./types/comments";
import { fetchComments } from "./api/comments";
import useCommentTree, { InsertComment } from "./hooks/useCommentTree";
import CommentForm from "./components/CommentForm";

function App() {
  const [initialComments, setInitialComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { comments, insertComment } = useCommentTree({ initialComments });

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
      <div className="p-4 shadow-md h-[90vh] min-w-[50vw] overflow-scroll flex flex-col gap-2">
        <CommentForm insertComment={insertComment} />
        <CommentList comments={comments} insertComment={insertComment} />
      </div>
    </div>
  );
}

const CommentList = ({ comments, insertComment }: { comments: IComment[]; insertComment: InsertComment }) => {
  return (
    <section className="flex flex-col gap-2">
      {comments?.map((comment: IComment) => (
        <Comment key={comment.id} comment={comment} insertComment={insertComment} />
      ))}
    </section>
  );
};

const Comment = ({ comment, insertComment }: { comment: IComment; insertComment: InsertComment }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex flex-col gap-2 border border-[#646464] p-2 rounded-lg">
      <div>
        <p>{comment.content}</p>
        <p>{comment.votes}</p>
        <p>{new Date(comment.timestamp)?.toLocaleString()}</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]" onClick={() => setExpand(!expand)}>
          {expand ? "Hide Reply" : "Reply"}
        </button>
        <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]">Edit</button>
        <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]">Delete</button>
      </div>
      {expand && (
        <div className="p-4 flex flex-col gap-2 m-2">
          {/* <div className="flex gap-3">
            <textarea className="border border-[#646464] p-2" cols={50} rows={3}></textarea>
            <button>Add Comment</button>
          </div> */}
          <CommentForm insertComment={insertComment} contentId={comment.id} />
          <CommentList comments={comment.replies || []} insertComment={insertComment} />
        </div>
      )}
    </div>
  );
};

export default App;
