const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-zinc-800 animate-pulse">
      {/* 썸네일 자리 */}
      <div className="w-full h-60 bg-zinc-700" />

      {/* 오버레이 텍스트 자리 */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 space-y-2 bg-black/40">
        <div className="w-3/4 h-4 rounded bg-zinc-600" />
        <div className="w-2/4 h-4 rounded bg-zinc-600" />
        <div className="w-1/4 h-4 rounded bg-zinc-600" />
      </div>
    </div>
  );
};

export default SkeletonCard;