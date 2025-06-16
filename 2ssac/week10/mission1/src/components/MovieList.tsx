import { useEffect, useRef, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 검ㄴ색 or 인기 영화 요청
  const fetchMovies = async (reset = false) => {
    try {
      setLoading(true);
      const data = query.trim()
        ? await searchMovies(query, includeAdult, language)
        : await fetchPopularMovies(page);
      if (reset) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }
      if (data.length === 0) setHasMore(false);
    } catch (err) {
      console.error('영화 목록을 불러오지 못했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) fetchMovies();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    await fetchMovies(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, [hasMore, loading]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-white rounded shadow"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목 입력"
          className="flex-1 min-w-[180px] px-3 py-2 border rounded"
        />
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={() => setIncludeAdult(!includeAdult)}
          />
          성인 콘텐츠 표시
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          검색하기
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovieId(movie.id)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedMovieId(movie.id);
              }
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <div ref={observerRef} className="h-16 mt-10" />

      {loading && (
        <div className="py-4 text-center text-gray-500 animate-pulse">
          불러오는 중...
        </div>
      )}

      {selectedMovieId !== null && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </>
  );
};

export default MovieList;