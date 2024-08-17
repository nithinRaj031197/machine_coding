import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { IComment } from "./types/comments";
import { fetchComments } from "./api/comments";
import useCommentTree, {
  DeleteComment,
  DownVoteComment,
  EditComment,
  ISortCommentType,
  InsertComment,
  SortComment,
  UpVoteComment,
} from "./hooks/useCommentTree";
import CommentForm from "./components/CommentForm";
import { SortCommentTypeEnum } from "./utilities/enums";

function App() {
  const [initialComments, setInitialComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<ISortCommentType>(SortCommentTypeEnum.NEWEST);

  const { comments, insertComment, deleteComment, editComment, upVoteComment, downVoteComment, sortComments } = useCommentTree({ initialComments });

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

  const handleSortComments = (e: ChangeEvent<HTMLSelectElement>) => {
    sortComments(e.target.value as SortCommentTypeEnum);
    setSortOrder(e.target.value as SortCommentTypeEnum);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments: {error?.message}</p>;

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <h1 className="text-center text-2xl font-bold">Nested Comment System</h1>
      <div className="p-4 shadow-md h-[90vh] w-[50vw]  flex flex-col gap-2">
        <CommentForm insertComment={insertComment} />
        <div>
          <label htmlFor="sort-selection">Sort By:</label>
          <select id="sort-selection" value={sortOrder} onChange={handleSortComments}>
            <option value={SortCommentTypeEnum.NEWEST}>Newest</option>
            <option value={SortCommentTypeEnum.OLDEST}>Oldest</option>
            <option value={SortCommentTypeEnum.MOST_VOTED}>Most Voted</option>
          </select>
        </div>
        <div className="overflow-scroll">
          {comments?.length > 0 ? (
            <CommentList
              comments={comments}
              insertComment={insertComment}
              deleteComment={deleteComment}
              editComment={editComment}
              upVoteComment={upVoteComment}
              downVoteComment={downVoteComment}
              sortComments={sortComments}
              sortOrder={sortOrder}
            />
          ) : (
            <div className="flex justify-center items-center h-[4rem]">No Comments</div>
          )}
        </div>
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
  sortComments,
  sortOrder,
}: {
  comments: IComment[];
  insertComment: InsertComment;
  deleteComment: DeleteComment;
  editComment: EditComment;
  upVoteComment: UpVoteComment;
  downVoteComment: DownVoteComment;
  sortComments: SortComment;
  sortOrder: ISortCommentType;
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
          sortComments={sortComments}
          sortOrder={sortOrder}
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
  sortComments,
  sortOrder,
}: {
  comment: IComment;
  insertComment: InsertComment;
  deleteComment: DeleteComment;
  editComment: EditComment;
  upVoteComment: UpVoteComment;
  downVoteComment: DownVoteComment;
  sortComments: SortComment;
  sortOrder: ISortCommentType;
}) => {
  const [expand, setExpand] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [updatedValue, setUpdatedValue] = useState(comment?.content);

  const editTextArea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditMode && editTextArea.current) {
      editTextArea.current?.focus();
      editTextArea.current?.select();
    }
  }, [isEditMode]);

  const handleUpdateCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedValue(e.target.value);
  };

  const handleEditMode = () => {
    if (updatedValue?.trim()) {
      editComment(comment?.id, updatedValue);
      setIsEditMode(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      if (updatedValue?.trim()) {
        handleEditMode();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 border border-[#646464] p-2 rounded-lg bg-[aliceblue]">
      {isEditMode ? (
        <div className="flex gap-3 items-center">
          <textarea
            ref={editTextArea}
            value={updatedValue}
            className="border border-[#646464] p-2 rounded-md"
            cols={50}
            rows={3}
            onChange={handleUpdateCommentChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button className="bg-[#0099ff] hover:bg-[#007bff] w-[6rem] h-[3rem] rounded-md  text-white" onClick={handleEditMode}>
            Save
          </button>
          <button
            className="bg-[#8b8c8c] w-[6rem] h-[3rem] rounded-md  text-white"
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
        <button
          className="bg-[#0099ff] hover:bg-[#007bff] p-1 min-w-[3rem] rounded-md text-xl"
          onClick={() => {
            upVoteComment(comment?.id);
            if (sortOrder === SortCommentTypeEnum.MOST_VOTED) sortComments(sortOrder);
          }}
        >
          👍
        </button>
        <button
          className="bg-[#0099ff] hover:bg-[#007bff]  p-1 min-w-[3rem] rounded-md text-xl"
          onClick={() => {
            downVoteComment(comment?.id);
            if (sortOrder === SortCommentTypeEnum.MOST_VOTED) sortComments(sortOrder);
          }}
        >
          👎
        </button>
        <button className="bg-[#0099ff] hover:bg-[#007bff] text-white p-2 rounded-md min-w-[5rem]" onClick={() => setExpand(!expand)}>
          {expand ? "Hide Reply" : "Reply"}
        </button>
        <button
          className="bg-[#0099ff] hover:bg-[#007bff] text-white p-2 rounded-md min-w-[5rem]"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          Edit
        </button>
        <button className="bg-[#0099ff] hover:bg-[#007bff] text-white p-2 rounded-md min-w-[5rem]" onClick={() => deleteComment(comment?.id)}>
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
            sortComments={sortComments}
            sortOrder={sortOrder}
          />
        </div>
      )}
    </div>
  );
};

export default App;
