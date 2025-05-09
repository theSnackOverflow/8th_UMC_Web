import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      await axiosInstance.post("/v1/auth/signup", form);
      alert("회원가입 성공! 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={handleChange}
        className="mb-2 px-4 py-2 border rounded text-black"
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        className="mb-2 px-4 py-2 border rounded text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        className="mb-4 px-4 py-2 border rounded text-black"
      />
      <button
        onClick={handleSignup}
        className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded text-white"
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;