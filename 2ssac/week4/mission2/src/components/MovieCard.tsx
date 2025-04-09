import React from "react";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* hover 시 보이는 overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex flex-col justify-end p-4">
        <h2 className="text-lg font-bold mb-1">{movie.title}</h2>
        <p className="text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
