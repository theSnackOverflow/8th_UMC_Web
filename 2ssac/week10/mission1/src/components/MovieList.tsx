import { useEffect, useRef, useState, useCallback } from 'react';
import {
  fetchMoviesBySort,
  searchMovies,
} from '../api/tmdb';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const sortOptions = [
  { value: 'popularity.desc', label: '인기순' },
  { value: 'vote_average.desc', label: '평점순' },
  { value: 'release_date.desc', label: '최신순' },
];

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ fetch movies
  const fetchMovies = useCallback(
    async (reset = false, pageToFetch = page) => {
      try {
        setLoading(true);
        const data = query.trim()
          ? await searchMovies(query, includeAdult, language)
          : await fetchMoviesBySort(pageToFetch, sortBy, language);

        setMovies((prev) => reset ? data : [...prev, ...data]);
        if (reset) setPage(1);
        if (data.length === 0) setHasMore(false);
      } catch (err) {
        console.error('영화 목록을 불러오지 못했습니다:', err);
      } finally {
        setLoading(false);
      }
    },
    [query, includeAdult, language, sortBy, page]
  );

  // ✅ 최초 로딩 + 검색 or 필터 제출 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasMore(true);
    await fetchMovies(true, 1);
  };
  
  // ✅ 정렬, 언어, 성인콘텐츠 변경 시 재요청 (검색이 아닐 경우만)
  useEffect(() => {
    if (!query.trim()) {
      setHasMore(true);
      fetchMovies(true, 1);
    }
  }, [sortBy, language, includeAdult]);

  // ✅ 무한 스크롤 감지
  useEffect(() => {
    if (query.trim()) return; // 검색 시 무한스크롤 제외

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
  }, [hasMore, loading, query]);

  // ✅ 페이지 증가 시
  useEffect(() => {
    if (!query.trim() && page > 1) {
      fetchMovies(false, page);
    }
  }, [page]);

  return (
    <>
      {/* 검색 / 필터 폼 */}
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
            onChange={() => setIncludeAdult((prev) => !prev)}
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          검색하기
        </button>
      </form>

      {/* 영화 리스트 */}
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

      {/* 무한스크롤 옵저버 */}
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