type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="overflow-hidden transition bg-white shadow rounded-2xl hover:shadow-lg">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="object-cover w-full h-72"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
        <p className="text-sm font-semibold text-yellow-500">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}