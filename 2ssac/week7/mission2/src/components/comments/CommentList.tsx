import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteComments } from "../../hooks/comments/useInfiniteComments";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

const CommentList = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteComments(Number(lpId), order);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.6, rootMargin: "0px 0px 200px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="w-full max-w-xl mt-12 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">댓글</h2>
        <div className="space-x-2">
          <button
            onClick={() => setOrder("asc")}
            className={`px-2 py-1 text-sm rounded ${
              order === "asc" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-2 py-1 text-sm rounded ${
              order === "desc" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <CommentInput order={order} />

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      {isFetchingNextPage &&
        [...Array(3)].map((_, i) => (
          <div key={i} className="w-full h-12 rounded bg-zinc-700 animate-pulse" />
        ))}

      <div ref={observerRef} className="h-1 mb-10" />
    </div>
  );
};

export default CommentList;