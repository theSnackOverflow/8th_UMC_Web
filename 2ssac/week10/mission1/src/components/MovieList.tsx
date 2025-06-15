import MovieCard from "./MovieCard";

const dummyMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    poster_path: "/nLBRD7UPR6GjmWQp6ASAfCTaWKX.jpg",
    release_date: "2023-07-19",
    vote_average: 8.3,
  },
  {
    id: 2,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    release_date: "2021-10-22",
    vote_average: 8.0,
  },
];

export default function MovieList() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dummyMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}