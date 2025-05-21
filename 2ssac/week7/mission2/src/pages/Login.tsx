import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "..//hooks/auth/useLogin";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          login(accessToken, refreshToken);
          navigate("/");
        },
        onError: () => {
          setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        },
      }
    );
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
          disabled={loginMutation.isPending}
          className="w-full py-2 text-white transition bg-pink-500 rounded hover:bg-pink-600 disabled:opacity-50"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default Login;