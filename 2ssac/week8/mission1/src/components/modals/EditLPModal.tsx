import { useState, useEffect, useRef } from "react";
import { useUpdateLP } from "../../hooks/lps/useUpdateLP";
import { useUploadImage } from "../../hooks/uploads/useUploadImage";
import type { LPDetail } from "../../hooks/lps/useLPDetail";

interface EditLPModalProps {
  lp: LPDetail;
  onClose: () => void;
}

const EditLPModal = ({ lp, onClose }: EditLPModalProps) => {
  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [tags, setTags] = useState(lp.tags.map((t) => t.name).join(", "));
  const [published, setPublished] = useState(lp.published);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(lp.thumbnail);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = useUploadImage();
  const updateLP = useUpdateLP(lp.id);

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailFile]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    let imageUrl = lp.thumbnail;
    if (thumbnailFile) {
      imageUrl = await uploadImage.mutateAsync(thumbnailFile);
    }

    updateLP.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        thumbnail: imageUrl,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        published,
      },
      {
        onSuccess: () => {
          alert("LP 정보가 수정되었습니다.");
          onClose();
        },
        onError: () => {
          alert("수정에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg p-6 space-y-4 text-white rounded-lg shadow-xl bg-zinc-900">
        <h2 className="text-xl font-semibold text-center">LP 수정</h2>

        {/* 썸네일 */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={previewUrl || "/avatar.png"}
            alt="LP 이미지"
            className="object-cover w-32 h-32 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            hidden
          />
          <p className="text-sm text-gray-400">이미지를 클릭하여 변경</p>
        </div>

        {/* 입력 필드들 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full px-4 py-2 rounded bg-zinc-800"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="설명"
          rows={4}
          className="w-full px-4 py-2 rounded bg-zinc-800"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그 (쉼표로 구분)"
          className="w-full px-4 py-2 rounded bg-zinc-800"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>공개 여부</span>
        </label>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadImage.isPending || updateLP.isPending}
            className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 disabled:opacity-50"
          >
            {updateLP.isPending ? "수정 중..." : "수정"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLPModal;