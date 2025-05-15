import dayjs from "dayjs";
import type { Comment } from "../../hooks/useInfiniteComments";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="px-4 py-3 text-sm rounded-lg bg-zinc-800">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{comment.author.name}</span>
        <span>{dayjs(comment.createdAt).format("YYYY.MM.DD HH:mm")}</span>
      </div>
      <p className="mt-1 text-white">{comment.content}</p>
    </div>
  );
};

export default CommentItem;