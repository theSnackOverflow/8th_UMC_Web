import { useOutletContext } from "react-router-dom";
import { useLPs } from "../hooks/useLPs";
import LPCard from "../components/LPCard";

type OutletContextType = {
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
};

const Home = () => {
  const { order, setOrder } = useOutletContext<OutletContextType>();
  const { data: lps, isLoading, error } = useLPs({ order });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lps?.map((lp) => (
          <LPCard key={lp.id} lp={lp} />
        ))}
      </div>
    </div>
  );
};

export default Home;