import { Link } from "react-router-dom"
import { dummyMovies } from "../data/dummyMovies"

const MovieList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-5">
      {dummyMovies.map((movie) => (
        <Link to={`/detail/${movie.id}`} key={movie.id}>
          <div className="transition bg-white rounded shadow hover:shadow-lg">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="object-cover w-full rounded-t h-60"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-500">⭐ {movie.vote_average}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieList