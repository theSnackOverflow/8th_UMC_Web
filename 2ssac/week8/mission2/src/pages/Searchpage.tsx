import { useState, useRef, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchLps } from "../hooks/lps/useSearchLps";
import LPCard from "../components/LPCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchLps(debouncedQuery);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, data]);

  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <h1 className="mb-6 text-2xl font-bold text-pink-400">🔍 LP 찾기</h1>

      <input
        type="text"
        placeholder="앨범 제목 또는 태그를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 text-sm text-white border rounded-lg bg-zinc-800 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pages.flatMap((page) =>
          page.data.map((lp) => <LPCard key={lp.id} lp={lp} />)
        )}
      </div>

      {/* 무한스크롤 트리거*/}
      {hasNextPage && (
        <div ref={observerRef} className="h-10 mt-10 text-center">
          {isFetchingNextPage ? "로딩 중..." : "더 불러오는 중..."}
        </div>
      )}

      {!isLoading && data?.pages[0].data.length === 0 && (
        <p className="mt-10 text-sm text-gray-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;