import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../../types/movie";
import MovieCard from "../../components/MovieCard";

import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 따른 타입을 정의
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjFiNTk0MTNiNzU2NmE2ZDBjNDM4N2QyNzllZGY1ZiIsIm5iZiI6MTc0MzQ5OTg3NC4zODIwMDAyLCJzdWIiOiI2N2ViYjI2MjM4NWVhMDFiODk3YWFkMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HSO6n5h1aAHzERPsKmZQxTETLvbow93dBotVdui7R2k`,
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  console.log(movies);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
