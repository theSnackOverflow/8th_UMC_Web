import MovieList from "../components/MovieList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="py-8 text-3xl font-bold text-center">🎬 인기 영화 목록</h1>
      <MovieList />
    </div>
  );
}