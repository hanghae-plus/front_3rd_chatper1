/** @jsx createVNode */
import { createVNode } from "../../lib/createVNode";

// 상수 선언
const PLACEHOLDER_TEXT = "무슨 생각을 하고 계신가요?";
const BUTTON_TEXT = "게시";

// PostForm 컴포넌트
export const PostForm = () => {
  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea id="post-content" placeholder={PLACEHOLDER_TEXT} className="w-full p-2 border rounded"></textarea>
      <button id="post-submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">{BUTTON_TEXT}</button>
    </div>
  );
};
