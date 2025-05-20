import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useUploadImage } from "../hooks/uploads/useUploadImage";

const Signup = () => {
  const navigate = useNavigate();
  const uploadImage = useUploadImage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async () => {
    const { name, email, password, bio } = form;

    if (!name || !email || !password) {
      return setError("이름, 이메일, 비밀번호는 필수입니다.");
    }

    setIsLoading(true);
    setError("");

    try {
      let avatarUrl = form.avatar;
      if (avatarFile) {
        avatarUrl = await uploadImage.mutateAsync(avatarFile);
      }

      await axiosInstance.post("/v1/auth/signup", {
        name,
        email,
        password,
        bio,
        avatar: avatarUrl,
      });

      alert("회원가입 성공! 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      setError("회원가입 실패: 이메일 중복 또는 서버 오류입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black">
      <div className="w-full max-w-sm p-6 space-y-6 shadow-lg rounded-xl bg-zinc-800">
        <h2 className="text-xl font-bold text-center">회원가입</h2>

        {/* 아바타 */}
        <div className="flex flex-col items-center space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-24 h-24 overflow-hidden border-2 rounded-full cursor-pointer border-zinc-600 hover:opacity-80"
          >
            <img
              src={avatarPreview || "/avatar.png"}
              alt="프로필 이미지"
              className="object-cover w-full h-full"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </div>
          <p className="text-sm text-gray-400">프로필 사진 클릭해서 업로드</p>
        </div>

        {/* 입력 필드 */}
        {["name", "email", "password", "bio"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={
              field === "name"
                ? "이름"
                : field === "email"
                ? "이메일"
                : field === "password"
                ? "비밀번호"
                : "한 줄 소개 (선택)"
            }
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white rounded bg-zinc-700 focus:outline-none"
          />
        ))}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={isLoading || uploadImage.isPending}
          className="w-full py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:opacity-50"
        >
          {isLoading || uploadImage.isPending ? "가입 중..." : "회원가입"}
        </button>
      </div>
    </div>
  );
};

export default Signup;