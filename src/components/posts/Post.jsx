/** @jsx createVNode */
import { createVNode } from "../../lib";

export function Post() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <img
          className="rounded-full mr-2"
          src="https://via.placeholder.com/40"
          alt="프로필"
        />
        <div>
          <p className="font-bold">이름</p>
          <p className="text-sm text-gray-500">시간</p>
        </div>
      </div>
      <p>컨텐츠</p>
      <div className="mt-2 flex justify-between text-gray-500">
        {["좋아요", "댓글", "공유"].map((btnText) => {
          return <button>{btnText}</button>;
        })}
      </div>
    </div>
  );
}
