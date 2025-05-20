import { useRef, useState } from "react";
import { useCreateLP } from "../../hooks/lps/useCreateLP";
import { useUploadImage } from "../../hooks/uploads/useUploadImage";

export type AddLPModalProps = {
  onClose: () => void;
};

const AddLPModal = ({ onClose }: AddLPModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createLP = useCreateLP();
  const uploadImage = useUploadImage();


  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요");

    try {
      let thumbnailUrl = "/lp_thumbnail_image.png";

      if (thumbnail) {
        thumbnailUrl = await uploadImage.mutateAsync(thumbnail);
      }

      createLP.mutate(
        {
          title,
          content,
          thumbnail: thumbnailUrl,
          tags,
          published: true,
        },
        {
          onSuccess: () => {
            alert("등록 성공!");
            onClose();
          },
          onError: () => {
            alert("등록 실패 😢");
          },
        }
      );
    } catch (err) {
      alert("이미지 업로드 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 rounded-lg shadow-xl bg-zinc-900">
        {/* 모달 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute text-xl text-white top-2 right-2"
        >
          ×
        </button>

        <div className="flex flex-col items-center space-y-4">
          {/* 썸네일 업로드 */}
          <div
            className="relative w-40 h-40 overflow-hidden border rounded-full cursor-pointer bg-zinc-800 hover:opacity-80 border-zinc-700"
            onClick={handleThumbnailClick}
          >
            {thumbnail ? (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="썸네일 미리보기"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="/lp_thumbnail_image.png"
                alt="기본 썸네일"
                className="object-cover w-full h-full"
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </div>

          {/* 제목 */}
          <input
            type="text"
            placeholder="LP Name"
            className="w-full px-4 py-2 text-sm text-white rounded bg-zinc-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 내용 */}
          <input
            type="text"
            placeholder="LP Content"
            className="w-full px-4 py-2 text-sm text-white rounded bg-zinc-800"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 태그 입력 */}
          <div className="flex w-full gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              className="flex-1 px-4 py-2 text-sm text-white rounded bg-zinc-800"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 text-sm text-white bg-pink-500 rounded"
            >
              Add
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap w-full gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center px-3 py-1 text-sm text-white rounded-full bg-zinc-700"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-xs text-red-400 hover:text-red-200"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* 버튼 */}
          <div className="flex w-full gap-2 pt-2">
            <button
              className="flex-1 px-4 py-2 text-sm text-white bg-pink-600 rounded"
              onClick={handleSubmit}
            >
              Add LP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLPModal;
