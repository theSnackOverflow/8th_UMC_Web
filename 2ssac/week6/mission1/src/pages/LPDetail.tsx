import { useParams } from "react-router-dom";
import { useLPDetail } from "../hooks/useLPDetail";

const LPDetail = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const {
    data: lp,
    isLoading,
    error,
  } = useLPDetail(lpId || ""); // 빈 문자열 fallback

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !lp) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-zinc-800 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
      <p className="text-sm text-gray-400 mb-4">
        작성일: {new Date(lp.createdAt).toLocaleDateString()} | 좋아요: {lp.likes.length}
      </p>

      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-auto rounded mb-6"
      />

      <p className="mb-4">{lp.content}</p>

      <div className="flex flex-wrap gap-2">
        {lp.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-sm px-2 py-1 bg-pink-600 text-white rounded-full"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LPDetail;