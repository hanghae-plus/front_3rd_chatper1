/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href="/" className="text-blue-600 font-bold" data-link="true">
            홈
          </a>
        </li>
        <li>
          <a href="/login" className="text-gray-600" data-link="true">
            로그인
          </a>
        </li>
      </ul>
    </nav>
  );
};
