/** @jsx createVNode */
import { createVNode } from "../../lib/createVNode";

// 상수 선언
const COPYRIGHT_TEXT = "© 2024 항해플러스. All rights reserved.";

// Footer 컴포넌트
export const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p>{COPYRIGHT_TEXT}</p>
    </footer>
  );
};
