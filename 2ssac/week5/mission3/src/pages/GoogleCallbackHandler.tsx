// src/pages/GoogleCallbackHandler.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoogleCallbackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      login(accessToken, refreshToken); // context 업데이트
      navigate("/"); // 홈이나 원하는 페이지로 이동
    } else {
      alert("구글 로그인에 실패");
      navigate("/login");
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default GoogleCallbackHandler;