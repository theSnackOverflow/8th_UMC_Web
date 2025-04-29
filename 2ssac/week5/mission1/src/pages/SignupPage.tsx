import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type FormData = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const handleFinalSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:8000/v1/auth/signup", {
        name: data.nickname,
        email: savedEmail,
        password: savedPassword,
      });

      console.log("회원가입 성공 🎉", response.data);
      alert(`${data.nickname}님, 회원가입을 환영합니다!`);
      navigate("/login");
    } catch (error: any) {
      console.error("회원가입 실패 ❌", error.response?.data || error.message);
      alert("회원가입에 실패했습니다. 이미 존재하는 이메일일 수 있어요.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>

        <h2 className="text-2xl font-bold text-center">회원가입</h2>

        {/* STEP 1 - 이메일 입력 */}
        {step === 1 && (
          <form
            onSubmit={handleSubmit((data) => {
              setSavedEmail(data.email);
              setStep(2);
            })}
            className="space-y-4"
          >
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
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-2 rounded-md font-semibold transition ${
                isValid
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* STEP 2 - 비밀번호 입력 */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit((data) => {
              setSavedPassword(data.password);
              setStep(3);
            })}
            className="space-y-4"
          >
            <div className="text-sm text-gray-400">
              이전에 입력한 이메일: <span className="text-white">{savedEmail}</span>
            </div>

            <div className="relative">
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 해요.",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className="w-full p-2 pr-10 rounded-md bg-zinc-800 text-white border border-gray-600 focus:outline-none"
              />
              <div
                className="absolute right-2 top-2.5 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword", {
                  required: "비밀번호를 다시 입력해주세요.",
                  validate: (value) =>
                    value === watch("password") || "비밀번호가 일치하지 않습니다.",
                })}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요!"
                className="w-full p-2 rounded-md bg-zinc-800 text-white border border-gray-600 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                !watch("password") ||
                !watch("confirmPassword") ||
                watch("password") !== watch("confirmPassword")
              }
              className={`w-full py-2 rounded-md font-semibold transition ${
                watch("password") &&
                watch("confirmPassword") &&
                watch("password") === watch("confirmPassword")
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* STEP 3 - 닉네임 + 제출 */}
        {step === 3 && (
          <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-3xl text-gray-600">👤</span>
              </div>
            </div>

            <div className="text-sm text-gray-400 text-center">
              가입 이메일: <span className="text-white">{savedEmail}</span>
            </div>

            <div>
              <input
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 최소 2자 이상이어야 해요.",
                  },
                })}
                type="text"
                placeholder="닉네임을 입력해주세요!"
                className="w-full p-2 rounded-md bg-zinc-800 text-white border border-gray-600 focus:outline-none"
              />
              {errors.nickname && (
                <p className="text-red-400 text-sm mt-1">{errors.nickname.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!watch("nickname") || watch("nickname").length < 2}
              className={`w-full py-2 rounded-md font-semibold transition ${
                watch("nickname") && watch("nickname").length >= 2
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;