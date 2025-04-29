import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-green-600">UMC 영화 서비스 🎬</h1>
      <p className="text-gray-600 text-lg">
        지금 인기 영화부터, 개봉 예정작까지 모두 확인해보세요!
      </p>
      <Link
        to="/movies/popular"
        className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
      >
        인기 영화 보러가기 →
      </Link>
    </div>
  );
};

export default Landing;
