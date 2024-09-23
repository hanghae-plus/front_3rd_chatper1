import { AUTH_PATH, PUBLIC_PATH, TAB_LIST, PERMISSION } from "../constants";

function TabList(type) {
  const path = type === PERMISSION.AUTH ? AUTH_PATH : PUBLIC_PATH;
  const filteredPathIds = path.map((path) => path.id);

  const currentPath = window.location.pathname;
  const tabListHtml = TAB_LIST.filter((tab) => filteredPathIds.includes(tab.id))
    .map(
      (tab) =>
        `<li><a href="${tab.path}" id="${tab.id}" class="${
          tab.path === currentPath ? "text-blue-600 font-bold" : "text-gray-600"
        }">${tab.name}</a></li>`
    )
    .join("");

  return `
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul id='tab-list' class="flex justify-around">
            ${tabListHtml}  
          </ul>
        </nav>
        `;
}

export default function Header(type) {
  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${TabList(type)}
  `;
}
