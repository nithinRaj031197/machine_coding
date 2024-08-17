import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Virtualization: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
      } catch (error) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const itemHeight = 200;
  const gap = 10;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div
      style={{
        ...style,
        marginTop: gap,
      }}
      className="border border-gray-400 p-2 m-4"
    >
      <h3>{posts[index].title}</h3>
      <p>{posts[index].body}</p>
    </div>
  );

  return (
    <div>
      <h1 className="mx-4 font-bold text-2xl">Posts</h1>
      <List
        height={1000} // Height of the virtualized list
        itemCount={posts.length} // Number of items in the list
        itemSize={itemHeight + gap} // Total height including gap
        width="100%" // Width of the virtualized list
        style={{ padding: "1rem" }}
      >
        {Row}
      </List>
    </div>
  );
};

export default Virtualization;
