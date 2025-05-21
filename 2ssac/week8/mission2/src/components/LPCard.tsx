import { type LP } from "../api/ls"; // 타입 분리 권장
import { useNavigate } from "react-router-dom";

type LPCardProps = {
  lp: LP;
};

const LPCard = ({ lp }: LPCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden transition-transform duration-200 rounded-lg shadow-md cursor-pointer group hover:scale-105"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title || "앨범 이미지"}
        className="object-cover w-full transition-opacity duration-200 h-60 group-hover:opacity-30"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white transition-opacity duration-200 bg-black opacity-0 group-hover:opacity-100 bg-opacity-60">
        <h3 className="text-lg font-semibold truncate">{lp.title}</h3>
        <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString()}</p>
        <p className="text-sm">❤️ {lp.likes?.length ?? 0}</p>
      </div>
    </div>
  );
};

export default LPCard;