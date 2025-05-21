import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateComment } from "../../hooks/comments/useCreateComment";

type Props = {
  order: "asc" | "desc";
};

const CommentInput = ({ order }: Props) => {
  const { lpId } = useParams<{ lpId: string }>();
  const [content, setContent] = useState("");
  const createComment = useCreateComment(Number(lpId), order);

  const handleSubmit = () => {
    if (!content.trim()) return;
    createComment.mutate(content, {
      onSuccess: () => {
        setContent("");
      },
    });
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-4 py-2 text-sm text-white rounded bg-zinc-800"
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={createComment.isPending}
        className="px-4 py-2 text-sm font-semibold text-white bg-pink-600 rounded disabled:opacity-50"
      >
        작성
      </button>
    </div>
  );
};

export default CommentInput;