import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { fetchMovieDetail } from '../api/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Props = {
  movieId: number;
  onClose: () => void;
};

type MovieDetail = {
  title: string;
  original_title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  imdb_id: string;
};

const MovieModal = ({ movieId, onClose }: Props) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetail(String(movieId));
        setMovie(data);
      } catch {
        setError('영화 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (loading) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-black bg-opacity-60 backdrop-blur-sm sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 이미지 오버레이 */}
        {movie?.poster_path && (
          <div className="relative h-64 bg-black">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="absolute inset-0 object-cover w-full h-full opacity-60"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{movie.title}</h2>
              <p className="mt-1 text-sm italic text-gray-300">{movie.original_title}</p>
            </div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute z-10 text-2xl text-white top-4 right-4 hover:text-gray-300"
        >
          ✕
        </button>

        {/* 콘텐츠 본문 */}
        <div className="flex flex-col gap-6 px-4 py-6 bg-white sm:px-6 md:flex-row">
          {error || !movie ? (
            <p className="font-semibold text-red-600">{error || '영화 정보를 불러올 수 없습니다.'}</p>
          ) : (
            <>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="object-contain w-full max-w-xs mx-auto shadow md:mx-0 md:w-1/3 max-h-80 rounded-xl"
              />
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-yellow-600">⭐ 평점:</span>{' '}
                    {movie.vote_average} / 10 ({movie.vote_count}명)
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">🎬 개봉일:</span>{' '}
                    {movie.release_date}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                    {movie.overview}
                  </p>
                </div>
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-sm font-medium text-blue-600 underline hover:text-blue-800"
                >
                  IMDb에서 더 보기 →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;