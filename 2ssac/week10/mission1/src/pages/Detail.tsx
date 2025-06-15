import { useParams } from "react-router-dom"
import { dummyMovies } from "../data/dummyMovies"

const Detail = () => {
  const { id } = useParams()
  const movie = dummyMovies.find((m) => m.id === Number(id))

  if (!movie) {
    return <div className="p-8 text-center text-red-500">영화를 찾을 수 없습니다.</div>
  }

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full rounded-lg shadow-md"
      />
      <h2 className="mt-6 text-3xl font-bold">{movie.title}</h2>
      <p className="mt-2 text-lg text-gray-700">평점: {movie.vote_average}</p>
    </div>
  )
}

export default Detail