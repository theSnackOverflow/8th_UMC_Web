// src/pages/OAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
      navigate("/");
    } else {
      alert("로그인 실패 또는 토큰 없음");
      navigate("/login");
    }
  }, []);

  return <div className="text-center mt-10 text-gray-600">로그인 처리 중입니다...</div>;
};

export default OAuthCallback;