import { IComment } from "../types/comments";

interface ICommentsProps {
  handleHideReply: () => void;
  comment: IComment;
  hideReply: boolean;
}
const Comment = ({ handleHideReply, comment, hideReply }: ICommentsProps) => {
  return (
    <>
      <div>
        <p className="text-[1rem] font-bold">{comment?.content}</p>
        <p className="text-sm font-medium">{comment?.votes}</p>
        <p className="text-sm font-medium">{new Date(comment?.timestamp)?.toLocaleString()}</p>
      </div>

      <div className="flex gap-2 w-full">
        <button className="bg-[#0099ff] text-white p-1 min-w-[6rem] rounded-md" onClick={handleHideReply}>
          {hideReply ? "Reply" : "Hide Replies"}
        </button>
        <button className="bg-[#0099ff] text-white p-1 min-w-[5rem] rounded-md">Edit</button>
        <button className="bg-[#e02424] text-white p-1 min-w-[5rem] rounded-md">Delete</button>
      </div>
    </>
  );
};

export default Comment;
