/** @jsx createVNode */
import { createVNode } from "../../lib/createVNode";

// 상수 선언
const APP_TITLE = "항해플러스";

// Header 컴포넌트
export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0">
      <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
    </header>
  );
};
