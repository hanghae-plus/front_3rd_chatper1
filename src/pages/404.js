import { appendChild, createElement } from "@/utils";

export default function NotFound() {
  const NotFound = createElement({
    tagName: "main",
    className:
      "bg-white p-8 rounded-lg shadow-md w-full text-center max-w-[480px]",
  });

  const NotFoundTitle = createElement({
    tagName: "h1",
    className: "text-2xl font-bold text-blue-600 mb-4 ",
    textContent: "항해 플러스",
  });

  const NotFoundNum = createElement({
    tagName: "p",
    className: "text-4xl font-bold text-gray-800 mb-4",
    textContent: "404",
  });

  const NotFoundDescTitle = createElement({
    tagName: "p",
    className: "text-xl text-gray-600 mb-8",
    textContent: "페이지를 찾을 수 없습니다",
  });

  const NotFoundDescDetail = createElement({
    tagName: "p",
    className: "text-gray-600 mb-8",
    textContent: "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
  });

  const NotFoundLink = createElement({
    tagName: "a",
    className: "bg-blue-600 text-white px-4 py-2 rounded font-bold",
    textContent: "홈으로 돌아가기",
    setAttribute: { href: "#main" },
  });

  appendChild({
    parent: NotFound,
    children: [
      NotFoundTitle,
      NotFoundNum,
      NotFoundDescTitle,
      NotFoundDescDetail,
      NotFoundLink,
    ],
  });

  return NotFound;
}
