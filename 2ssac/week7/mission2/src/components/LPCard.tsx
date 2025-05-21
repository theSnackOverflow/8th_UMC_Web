import { type LP } from "../api/ls";
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
      className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-60 object-cover transition-opacity duration-200 group-hover:opacity-30"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-60 text-white">
        <h3 className="text-lg font-semibold truncate">{lp.title}</h3>
        <p className="text-sm">
          {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm">❤️ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LPCard;