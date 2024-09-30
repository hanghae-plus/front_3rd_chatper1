/** @jsx createVNode */
import { createVNode } from "../lib";

export function NotFoundPage() {
  return (
    <main className="bg-white p-8 rounded-lg shadow-md w-full text-center max-w-[480px]">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 ">항해 플러스</h1>
      <p className="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p className="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a
        className="bg-blue-600 text-white px-4 py-2 rounded font-bold cursor-pointer"
        href="/"
      >
        홈으로 돌아가기
      </a>
    </main>
  );
}
