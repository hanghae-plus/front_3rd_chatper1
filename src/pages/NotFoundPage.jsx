/** @jsx createVNode */
import { createVNode } from "../lib/createVNode.js";

// 상수 선언
const PAGE_TITLE = "항해플러스";
const ERROR_CODE = "404";
const ERROR_MESSAGE = "페이지를 찾을 수 없습니다";
const ERROR_DETAIL_MESSAGE = "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.";
const BACK_HOME_TEXT = "홈으로 돌아가기";

// NotFoundPage 컴포넌트
export const NotFoundPage = () => {
  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">{PAGE_TITLE}</h1>
        <p className="text-4xl font-bold text-gray-800 mb-4">{ERROR_CODE}</p>
        <p className="text-xl text-gray-600 mb-8">{ERROR_MESSAGE}</p>
        <p className="text-gray-600 mb-8">{ERROR_DETAIL_MESSAGE}</p>
        <a href="/" data-link="true" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">{BACK_HOME_TEXT}</a>
      </div>
    </main>
  );
};
