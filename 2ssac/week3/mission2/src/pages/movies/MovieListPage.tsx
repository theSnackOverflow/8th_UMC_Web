import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../../types/movie";
import MovieCard from "../../components/MovieCard";

type MovieListPageProps = {
  category: "popular" | "upcoming" | "top_rated" | "now_playing";
};

const MovieListPage = ({ category }: MovieListPageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async (currentPage: number) => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjFiNTk0MTNiNzU2NmE2ZDBjNDM4N2QyNzllZGY1ZiIsIm5iZiI6MTc0MzQ5OTg3NC4zODIwMDAyLCJzdWIiOiI2N2ViYjI2MjM4NWVhMDFiODk3YWFkMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HSO6n5h1aAHzERPsKmZQxTETLvbow93dBotVdui7R2k`,
          },
        }
      );
      setMovies(data.results);
    } catch (e) {
      console.error("🔥 에러 발생:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [category, page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-4 items-center">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          이전
        </button>

        <span className="text-lg font-medium">페이지 {page}</span>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MovieListPage;
