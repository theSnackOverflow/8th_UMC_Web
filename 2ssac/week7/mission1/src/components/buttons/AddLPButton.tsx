import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type AddLPButtonProps = {
  onClick: () => void;
};

const AddLPButton = ({ onClick }: AddLPButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed text-3xl text-white bg-pink-600 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 hover:bg-pink-700"
    >
      +
    </button>
  );
};

export default AddLPButton;