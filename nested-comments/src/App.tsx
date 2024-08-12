import { useEffect, useState } from "react";
import { fetchComments } from "./api/comments";
import NestedComments from "./components/NestedComments";
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
      <NestedComments comments={comments} />
    </div>
  );
}

export default App;
