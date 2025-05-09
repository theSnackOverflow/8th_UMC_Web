import { useRef, useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteComments } from "../hooks/useInfiniteComments";
import dayjs from "dayjs";

const Comment = () => {
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

  const comments = data?.pages.flatMap((page: { data: any[] }) => page.data) ?? [];

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

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

      {/* 댓글 입력창 (UI만) */}
      <input
        className="w-full px-4 py-2 text-sm text-black rounded focus:outline-none"
        placeholder="댓글을 입력해주세요"
        disabled
      />

      {/* 댓글 리스트 */}
      {comments.map((comment: { id: Key | null | undefined; author: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; createdAt: string | number | dayjs.Dayjs | Date | null | undefined; content: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <div
          key={comment.id}
          className="px-4 py-3 text-sm rounded-lg bg-zinc-800"
        >
          <div className="flex justify-between text-xs text-gray-400">
            <span>{comment.author.name}</span>
            <span>{dayjs(comment.createdAt).format("YYYY.MM.DD HH:mm")}</span>
          </div>
          <p className="mt-1 text-white">{comment.content}</p>
        </div>
      ))}

      {/* 스켈레톤 UI */}
      {isFetchingNextPage && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-12 rounded bg-zinc-700 animate-pulse" />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-1" />
    </div>
  );
};

export default Comment;