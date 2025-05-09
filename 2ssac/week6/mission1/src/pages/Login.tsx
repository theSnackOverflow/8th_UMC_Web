import { useState } from "react";
import { login as loginApi } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth(); // context의 login 함수
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken, refreshToken } = await loginApi(email, password);
      login(accessToken, refreshToken); // 토큰 저장
      navigate("/"); // 홈으로 이동 (또는 이전 경로)
    } catch (err) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded shadow bg-zinc-800">
        <h2 className="mb-4 text-2xl font-bold">로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 text-white rounded bg-zinc-700"
          required
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 text-white rounded bg-zinc-700"
          required
        />

        {error && <p className="mb-2 text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 text-white transition bg-pink-500 rounded hover:bg-pink-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;