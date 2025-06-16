import { useParams } from 'react-router-dom'
import { dummyMovies } from '../data/dummyMovies'

const Detail = () => {
  const { id } = useParams()
  const movie = dummyMovies.find((m) => m.id === Number(id))

  if (!movie) {
    return (
      <div className="mt-20 text-xl font-semibold text-center text-red-500">
        영화 정보를 찾을 수 없습니다.
      </div>
    )
  }

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-auto mb-6 rounded-lg shadow-md"
      />
      <h2 className="mb-4 text-3xl font-bold text-gray-800">{movie.title}</h2>
      <p className="mb-2 text-lg text-gray-700">
        <span className="font-semibold">평점:</span> ⭐ {movie.vote_average} / 10
      </p>
      <p className="text-sm text-gray-500">
        이 영화는 더미 데이터 기반으로 제공됩니다.
      </p>
    </div>
  )
}

export default Detail