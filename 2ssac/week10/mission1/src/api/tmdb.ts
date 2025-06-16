const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?language=ko-KR&page=1`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
};
