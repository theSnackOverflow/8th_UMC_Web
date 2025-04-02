import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../../types/movie";
import { CreditResponse } from "../../types/credit";
import Spinner from "../../components/Spinner";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(false);

      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjFiNTk0MTNiNzU2NmE2ZDBjNDM4N2QyNzllZGY1ZiIsIm5iZiI6MTc0MzQ5OTg3NC4zODIwMDAyLCJzdWIiOiI2N2ViYjI2MjM4NWVhMDFiODk3YWFkMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HSO6n5h1aAHzERPsKmZQxTETLvbow93dBotVdui7R2k`,
              },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjFiNTk0MTNiNzU2NmE2ZDBjNDM4N2QyNzllZGY1ZiIsIm5iZiI6MTc0MzQ5OTg3NC4zODIwMDAyLCJzdWIiOiI2N2ViYjI2MjM4NWVhMDFiODk3YWFkMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HSO6n5h1aAHzERPsKmZQxTETLvbow93dBotVdui7R2k`,
              },
            }
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (e) {
        console.error("에러 발생:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchDetail();
  }, [movieId]);

  if (loading) return <Spinner />;
  if (error || !movie)
    return (
      <div className="text-red-500 text-center mt-10">에러가 발생했습니다.</div>
    );

  return (
    <div className="text-white">
      {/* 배경 이미지 */}
      <div
        className="w-full h-[500px] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="bg-gradient-to-t from-black to-transparent w-full p-8">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="max-w-5xl mx-auto px-4 py-8 text-black">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 포스터 */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[250px] rounded-xl shadow"
          />

          {/* 텍스트 정보 */}
          <div className="flex-1 space-y-4">
            <p>
              <span className="font-bold">개봉일:</span> {movie.release_date}
            </p>
            <p>
              <span className="font-bold">평점:</span> ⭐ {movie.vote_average}
            </p>
            <p>
              <span className="font-bold">설명:</span>
            </p>
            <p className="leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        {/* 출연진 */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">👥 출연진</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {credits?.cast.slice(0, 12).map((person) => (
              <div key={person.id} className="text-center text-sm">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : "/no-image.png"
                  }
                  alt={person.name}
                  className="w-full aspect-[2/3] object-cover rounded-xl shadow"
                />
                <p className="mt-1 font-medium">{person.name}</p>
                <p className="text-gray-500">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
