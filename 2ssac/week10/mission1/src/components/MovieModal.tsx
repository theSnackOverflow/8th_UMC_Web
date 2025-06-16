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
      } catch (err) {
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-gradient-to-br from-white via-gray-100 to-gray-50 shadow-2xl transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-500 transition top-4 right-4 hover:text-black"
          aria-label="닫기"
        >
          ✕
        </button>

        {error || !movie ? (
          <p className="font-semibold text-red-500">영화 정보를 불러올 수 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-6 md:flex-row">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full shadow-lg md:w-1/3 rounded-xl"
            />
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="mb-1 text-3xl font-bold tracking-tight text-slate-900">
                  {movie.title}
                </h2>
                <p className="mb-4 text-sm italic text-slate-500">{movie.original_title}</p>

                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium text-yellow-600">⭐ 평점:</span> {movie.vote_average} / 10 ({movie.vote_count}명)
                  </p>
                  <p>
                    <span className="font-medium text-blue-600">🎬 개봉일:</span> {movie.release_date}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">{movie.overview}</p>
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
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;