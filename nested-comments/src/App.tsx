import { useEffect, useState } from "react";
import { fetchComments } from "./api/comments";
import { IComment } from "./types/comments";

function App() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
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
      <div className="p-4 shadow-md h-[90vh] min-w-[50vw]">
        <div className="flex gap-3">
          <textarea className="border border-[#646464] p-2" cols={50} rows={3}></textarea>
          <button>Add Comment</button>
        </div>
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

export default App;

const CommentList = ({ comments }: { comments: IComment[] }) => {
  const [expand, setExpand] = useState(false);

  return (
    <section>
      {comments?.map((comment: IComment) => {
        return (
          <div key={comment?.id} className="flex flex-col gap-2">
            <div>
              <p>{comment?.content}</p>
              <p>{comment?.votes}</p>
              <p>{new Date(comment.timestamp)?.toLocaleString()}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {!expand ? "Reply" : "Hide Reply"}
              </button>
              <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]">Edit</button>
              <button className="bg-[#0099ff] p-2 rounded-md min-w-[5rem]">Delete</button>
            </div>
            {expand && (
              <div className="p-4 shadow-md h-[90vh]">
                <div className="flex gap-3">
                  <textarea className="border border-[#646464] p-2" cols={50} rows={3}></textarea>
                  <button>Add Comment</button>
                </div>
                <CommentList comments={comment?.replies} />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
