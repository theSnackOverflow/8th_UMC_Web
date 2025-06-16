import type { Movie } from "../types/movie";

// 공통
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  Accept: "application/json",
};

const fetchFromTMDB = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, { headers: HEADERS });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`TMDB 요청 실패: ${res.status} - ${errorText}`);
  }
  return res.json();
};

// 정렬 후
export const fetchMoviesBySort = async (
  page: number = 1,
  sortBy: string = "popularity.desc",
  language: string = "ko-KR"
): Promise<Movie[]> => {
  const endpoint = `/discover/movie?sort_by=${sortBy}&language=${language}&page=${page}`;
  const data = await fetchFromTMDB(endpoint);
  return data.results;
};

// 상세 정보
export const fetchMovieDetail = async (id: string): Promise<Movie> => {
  return await fetchFromTMDB(`/movie/${id}?language=ko-KR`);
};

// 검색
export const searchMovies = async (
  query: string,
  includeAdult: boolean = false,
  language: string = "ko-KR"
): Promise<Movie[]> => {
  const encoded = encodeURIComponent(query);
  const endpoint = `/search/movie?query=${encoded}&include_adult=${includeAdult}&language=${language}`;
  const data = await fetchFromTMDB(endpoint);
  return data.results;
};
