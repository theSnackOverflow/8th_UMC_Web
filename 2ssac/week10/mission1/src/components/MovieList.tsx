import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { fetchPopularMovies } from '../api/tmdb';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
      {movies.map((movie) => (
        <div key={movie.id} className="p-2 bg-white rounded shadow">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded"
          />
          <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-600">평점: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;