import React from "react"
import { dummyMovies } from "../data/dummyMovies"

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const MovieList = () => {
  return (
    <div className="grid grid-cols-2 gap-6 px-4 pb-10 md:grid-cols-3 lg:grid-cols-4">
      {dummyMovies.map((movie) => (
        <div
          key={movie.id}
          className="overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow-md hover:scale-105"
        >
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="object-cover w-full h-80"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList