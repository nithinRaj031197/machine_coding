import { useEffect, useState } from "react";
import "./App.css";
import { fetchComments } from "./api/comments";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data?.data);
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
    <div>
      <h1>Nested Comment System</h1>
    </div>
  );
}

export default App;
