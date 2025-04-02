import React from "react";
import { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png"; // 대체 이미지 (public 폴더에 no-image.png 넣어두기)

  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* hover 시 보이는 overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex flex-col justify-end p-4">
        <h2 className="text-lg font-bold mb-1">{movie.title}</h2>
        <p className="text-sm line-clamp-3 mb-2">{movie.overview}</p>
        <p className="text-sm text-yellow-300">⭐ 평점: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
