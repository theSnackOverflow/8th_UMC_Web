import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // 🔍 검색 또는 인기영화 불러오기
  const fetchMovies = async () => {
    try {
      const results = query.trim()
        ? await searchMovies(query, includeAdult, language)
        : await fetchPopularMovies();
      setMovies(results);
    } catch (error) {
      console.error('영화 목록을 불러오지 못했습니다:', error);
    }
  };

  // ✅ 최초 mount 시 인기 영화 로드
  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔄 검색 제출 시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <>
      {/* 검색 폼 */}
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
          🔍 검색하기
        </button>
      </form>

      {/* 영화 카드 리스트 */}
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

      {/* 모달 */}
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