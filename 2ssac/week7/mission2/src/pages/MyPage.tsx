import { useState, useRef, useEffect } from "react";
import { useMyInfo } from "../hooks/auth/useMyInfo";
import { useUploadImage } from "../hooks/uploads/useUploadImage";
import { useUpdateProfile } from "../hooks/auth/useUpdateProfile";
import { useQueryClient } from "@tanstack/react-query";

const MyPage = () => {
  const { data: me, isLoading } = useMyInfo();
  const uploadImage = useUploadImage();
  const updateProfile = useUpdateProfile();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (me) {
      setName(me.name ?? "");
      setBio(me.bio ?? "");
      setAvatarPreview(me.avatar ?? "");
    }
  }, [me]);

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

    const prevUser = me;
    const updatedUser = {
      ...me,
      name: name.trim(),
      bio: bio.trim(),
      avatar: avatarUrl,
    };

    updateProfile.mutate(
      {
        name: updatedUser.name,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      },
      {
        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey: ["myInfo"] });
          const previous = queryClient.getQueryData(["myInfo"]);
          queryClient.setQueryData(["myInfo"], updatedUser);
          return { previous };
        },
        onError: (_err, _vars, context) => {
          if (context?.previous) {
            queryClient.setQueryData(["myInfo"], context.previous);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["myInfo"] });
        },
        onSuccess: () => {
          alert("프로필이 성공적으로 수정되었습니다!");
        },
      }
    );
  };

  if (isLoading || !me) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        불러오는 중...
      </div>
    );
  }

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
              src={avatarPreview || "/avatar.png"}
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
          <p className="text-sm text-gray-400">{me.email}</p>
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
          disabled={uploadImage.isPending}
          className="w-full px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:opacity-50"
        >
          {uploadImage.isPending ? "업로드 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};

export default MyPage;