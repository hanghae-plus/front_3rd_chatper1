/** @jsx createVNode */
import { createVNode } from "../../lib";
import { getNavItemClass, Navigation } from "./Navigation";

export const Header = ({ loggedIn }) => {
  return [
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>,
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class={getNavItemClass("/")} data-link>
            홈
          </a>
        </li>
        {Navigation({ loggedIn })}
      </ul>
    </nav>,
  ];
};
