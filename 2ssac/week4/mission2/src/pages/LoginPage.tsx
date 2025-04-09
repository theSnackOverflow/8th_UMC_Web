// src/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("로그인 시도:", data);
    // TODO: 백엔드 연결
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* 뒤로가기 버튼 */}
        <button onClick={() => navigate(-1)} className="flex items-center space-x-1 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>

        <h2 className="text-2xl font-bold text-center">로그인</h2>

        {/* 구글 로그인 */}
        <button className="w-full flex items-center justify-center py-2 border border-gray-500 rounded-lg hover:bg-white hover:text-black transition">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="google" className="w-5 h-5 mr-2" />
          구글 로그인
        </button>

        <div className="text-center text-gray-500">OR</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 이메일 입력 */}
          <div>
            <input
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "올바르지 않은 이메일 형식입니다.",
                },
              })}
              type="email"
              placeholder="이메일을 입력해주세요!"
              className="w-full p-2 rounded-md bg-zinc-800 text-white border border-gray-600 focus:outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 해요.",
                },
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className="w-full p-2 rounded-md bg-zinc-800 text-white border border-gray-600 focus:outline-none"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded-md font-semibold transition ${
              isValid
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;