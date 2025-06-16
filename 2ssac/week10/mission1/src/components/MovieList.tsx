import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';


const MovieList = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');

  const handleSearch = async () => {
    try {
      if (query.trim()) {
        const results = await searchMovies(query, includeAdult, language);
        setMovies(results);
      } else {
        const results = await fetchPopularMovies();
        setMovies(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-white rounded shadow"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목 입력"
          className="flex-1 min-w-[180px] px-3 py-2 border rounded"
        />
        <label className="flex items-center gap-1">
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

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <Link to={`/detail/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MovieList;