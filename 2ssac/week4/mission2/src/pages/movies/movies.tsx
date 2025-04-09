import MovieCard from "../../components/MovieCard";
import { MovieResponse } from "../../types/movie";
import { useCustomFetch } from "../../hooks/useCustomFetch";

const MoviesPage = () => {
  const { data, loading, error } = useCustomFetch<MovieResponse>(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-400 border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;