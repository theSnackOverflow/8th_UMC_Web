import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import type { Comment } from "../../hooks/comments/useInfiniteComments";
import { useParams } from "react-router-dom";
import { useUpdateComment } from "../../hooks/comments/useUpdateComment";
import { useDeleteComment } from "../../hooks/comments/useDeleteComment";
import { MoreHorizontal } from "lucide-react";
import { useMyInfo } from "../../hooks/auth/useMyInfo";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const { lpId } = useParams<{ lpId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const updateComment = useUpdateComment(Number(lpId), comment.id);
  const deleteComment = useDeleteComment(Number(lpId), comment.id);
  const { data: me } = useMyInfo();

  const menuRef = useRef<HTMLDivElement | null>(null);

  // 메뉴 바깥 클릭 시 자동 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = () => {
    if (!editedContent.trim()) return;
    updateComment.mutate(editedContent, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment.mutate();
    }
  };

  const isMyComment = me?.id === comment.author.id;

  return (
    <div className="relative px-4 py-3 text-sm rounded-lg bg-zinc-800">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{comment.author.name}</span>
        <span className="pr-8">{dayjs(comment.createdAt).format("YYYY.MM.DD HH:mm")}</span>
      </div>

      {isEditing ? (
        <div className="flex items-center mt-2">
          <input
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            className="w-full px-2 py-1 text-sm text-white rounded bg-zinc-900"
          />
          <button
            onClick={handleUpdate}
            className="ml-2 text-xl text-white hover:text-green-400"
          >
            ✓
          </button>
        </div>
      ) : (
        <p className="mt-1 text-white break-words">{comment.content}</p>
      )}

      {/* 메뉴 버튼 */}
      {isMyComment && !isEditing && (
        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-full text-white"
            aria-label="댓글 메뉴"
            aria-expanded={showMenu}
          >
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 z-50 flex w-40 overflow-hidden bg-white rounded shadow-lg top-8">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="flex-1 w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;