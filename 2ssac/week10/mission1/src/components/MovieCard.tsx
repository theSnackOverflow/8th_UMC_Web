import { memo } from 'react';
import type { Movie } from '../types/movie';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="overflow-hidden transition-all bg-white rounded-2xl shadow hover:scale-[1.03] hover:shadow-lg">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="object-cover w-full h-72"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
          <span>{movie.release_date}</span>
          <span className="font-medium text-yellow-500">⭐ {movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard);
