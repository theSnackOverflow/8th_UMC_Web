import type { Movie } from "../types/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/popular?language=ko-KR&page=1`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("인기 영화를 불러오지 못했습니다.");
  }

  const data = await res.json();
  return data.results;
};

// 영화 상세 정보
export const fetchMovieDetail = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("영화 정보를 불러오지 못했습니다.");
  }

  return await res.json();
};

// 영화 검색 기능
export const searchMovies = async (
  query: string,
  includeAdult = false,
  language = "ko-KR"
): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=${includeAdult}&language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("영화 검색에 실패했습니다.");
  }

  const data = await res.json();
  return data.results;
};