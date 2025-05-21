import { useRef, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useInfiniteLPs } from "../hooks/lps/useInfiniteLPs";
import LPCard from "../components/LPCard";
import SkeletonCard from "../components/SkeletonCard";
import type { LP } from "../hooks/lps/useInfiniteLPs";
import { useThrottle } from "../hooks/useThrottlets";

import AddLPButton from "../components/buttons/AddLPButton";
import AddLPModal from "../components/modals/AddLPModal";

type OutletContextType = {
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
};

const Home = () => {
  const { order, setOrder } = useOutletContext<OutletContextType>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteLPs(order);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const lps: LP[] = data?.pages.flatMap((page) => page.data) ?? [];


  // 쓰로틀링
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 1000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log(
        "%c[스크롤 감지] 즉시 scrollY:", 
        "color: #aaa;", 
        window.scrollY
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(
      "%c[쓰로틀 적용됨] throttledScrollY:", 
      "color: #4ade80; font-weight: bold;", 
      throttledScrollY
    );
  }, [throttledScrollY]);

  const showScrollTopButton = throttledScrollY > 1000;

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>  
      <button className="fixed top-6 left-6 z-[9999] bg-green-500 text-white px-4 py-2 rounded">
        위치 테스트
      </button>
      <div className="space-y-6">
        {/* 정렬 버튼 */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 rounded ${
              order === "desc"
                ? "bg-white text-black font-bold"
                : "bg-zinc-700 text-white"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 rounded ${
              order === "asc"
                ? "bg-white text-black font-bold"
                : "bg-zinc-700 text-white"
            }`}
          >
            오래된순
          </button>
        </div>

        {/* LP 카드 목록 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {lps.map((lp) => (
            <LPCard key={lp.id} lp={lp} />
          ))}

          {/* 다음 페이지 로딩 시 */}
          {isFetchingNextPage &&
            [...Array(6)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
        </div>

        {/* 무한 스크롤 관측 대상 */}
        <div ref={observerRef} className="h-1" />

        {/* LP 추가 버튼 */}
        <AddLPButton onClick={() => setIsModalOpen(true)} />

        {/* 모달 열기 */}
        {isModalOpen && <AddLPModal onClose={() => setIsModalOpen(false)} />}
        </div>
    </>
  );
};

export default Home;