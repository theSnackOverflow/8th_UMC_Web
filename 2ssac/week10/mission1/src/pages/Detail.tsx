import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetail } from '../api/tmdb';
import type { Movie } from '../types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchMovieDetail(id);
        setMovie(data);
      } catch (err) {
        setError('영화 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mt-20 text-center">로딩 중...</div>;
  }

  if (error || !movie) {
    return (
      <div className="mt-20 text-xl font-semibold text-center text-red-500">
        {error ?? '영화 정보를 찾을 수 없습니다.'}
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto mb-6 rounded-lg shadow-md"
      />
      <h2 className="mb-4 text-3xl font-bold text-gray-800">{movie.title}</h2>
      <p className="mb-2 text-lg text-gray-700">
        <span className="font-semibold">평점:</span> ⭐ {movie.vote_average} / 10
      </p>
      <p className="mb-2 text-gray-600">{movie.overview}</p>
      <p className="text-sm text-gray-500">개봉일: {movie.release_date}</p>
    </div>
  );
};

export default Detail;