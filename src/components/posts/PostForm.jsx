/** @jsx createVNode */
import { createVNode } from "../../lib";

export function PostForm() {
  return (
    <form className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="무슨 생각을 하고 계신가요?"
      ></textarea>
      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        게시
      </button>
    </form>
  );
}
