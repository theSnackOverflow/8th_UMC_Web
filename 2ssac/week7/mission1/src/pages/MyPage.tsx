import { useState, useRef } from "react";
import { useMyInfo } from "../hooks/auth/useMyInfo";
import { useUploadImage } from "../hooks/uploads/useUploadImage";
import { useUpdateProfile } from "../hooks/auth/useUpdateProfile";

const MyPage = () => {
  const { data: me } = useMyInfo();
  const uploadImage = useUploadImage();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState(me?.name ?? "");
  const [bio, setBio] = useState(me?.bio ?? "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(me?.avatar ?? "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("닉네임은 필수입니다.");

    let avatarUrl = avatarPreview;
    if (avatar) {
      avatarUrl = await uploadImage.mutateAsync(avatar);
    }

    updateProfile.mutate({
      name: name.trim(),
      bio: bio.trim(),
      avatar: avatarUrl,
    });
  };

  if (!me) return null;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-900">
      <div className="w-full max-w-md p-6 space-y-6 shadow-lg rounded-xl bg-zinc-800">
        {/* 아바타 */}
        <div className="flex flex-col items-center space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative overflow-hidden border-2 rounded-full cursor-pointer w-28 h-28 border-zinc-600 hover:opacity-80"
          >
            <img
              src={avatarPreview || "/avartar.png" }
              alt="프로필 사진"
              className="object-cover w-full h-full"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              hidden
            />
          </div>
          <p className="text-sm text-gray-400">클릭하여 사진 변경</p>
        </div>

        {/* 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">닉네임</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-white rounded bg-zinc-700 focus:outline-none"
              placeholder="닉네임"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">한 줄 소개</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 text-white rounded bg-zinc-700 focus:outline-none"
              placeholder="예: 리액트를 좋아하는 프론트엔드 개발자"
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MyPage;