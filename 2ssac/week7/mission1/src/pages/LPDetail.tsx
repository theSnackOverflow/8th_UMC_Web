import { useParams } from "react-router-dom";
import { useLPDetail } from "../hooks/lps/useLPDetail";
import CommentList from "../components/comments/CommentList";
import EditLPModal from "../components/modals/EditLPModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLikeLP } from "../hooks/lps/useLikeLP";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const LPDetail = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const safeLpId = Number(lpId || 0);

  const { data: lp, isLoading, error, refetch } = useLPDetail(lpId || "");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user } = useAuth();
  const { addLike, removeLike } = useLikeLP(safeLpId);

  if (isLoading) return <div className="p-6 text-white">로딩 중...</div>;
  if (error || !lp) return <div className="p-6 text-white">데이터를 불러오지 못했습니다.</div>;

  const isMine = user?.id === lp.author.id;
  const isLiked = lp.likes.some((like) => like.userId === user?.id);
  

  const handleToggleLike = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const onSettled = () => refetch();

    if (isLiked) {
      removeLike.mutate(undefined, { onSettled });
    } else {
      addLike.mutate(undefined, { onSettled });
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-12 text-white bg-black">
      <div className="relative flex flex-col items-center w-full max-w-xl gap-6 p-8 shadow-2xl rounded-2xl bg-zinc-900">
        
        {/* 작성자 */}
        <div className="absolute flex items-center gap-2 text-sm text-gray-300 top-6 left-6">
          <div className="w-6 h-6 bg-green-500 rounded-full" />
          <span>{lp.author.name}</span>
        </div>

        {/* 날짜 + 수정/삭제 버튼 */}
        <div className="absolute flex items-center gap-3 text-sm text-gray-500 top-6 right-6">
          <span>{dayjs(lp.createdAt).fromNow()}</span>
          {isMine && (
            <>
              <button
                title="수정"
                onClick={() => setIsEditOpen(true)}
                className="text-base hover:text-white"
              >
                ✏️
              </button>
              <button title="삭제" className="text-base hover:text-white">
                🗑️
              </button>
            </>
          )}
        </div>

        {/* 제목 */}
        <h1 className="mt-12 text-2xl font-semibold text-center">{lp.title}</h1>

        {/* 디스크 앨범 박스 */}
        <div className="p-6 bg-zinc-900/70 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
          <div className="relative flex items-center justify-center w-64 h-64 bg-black border rounded-full shadow-inner border-zinc-600">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="object-cover w-full h-full border rounded-full shadow-lg border-white/10 animate-spinSlow"
            />
            <div className="absolute z-10 w-8 h-8 rounded-full bg-zinc-900" />
          </div>
        </div>

        {/* 설명 */}
        <p className="max-w-md text-sm leading-relaxed text-center text-gray-300">
          {lp.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-xs text-white bg-gray-700 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex flex-col items-center gap-1 mt-4">
          <button
            onClick={handleToggleLike}
            disabled={!user || addLike.isPending || removeLike.isPending}
            className="text-xl transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <span className="text-sm">{lp.likes.length}</span>
        </div>

        {/* 댓글 */}
        <CommentList />

        {/* LP 수정 모달 */}
        {isEditOpen && (
          <EditLPModal
            lp={lp}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LPDetail;