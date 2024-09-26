import { appendChild, createElement } from "@/utils";
import { useNavigate } from "@/main";

export default function ErrorPage() {
  const ErrorPage = createElement({
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
    textContent: "ERROR",
  });

  const NotFoundDescTitle = createElement({
    tagName: "p",
    className: "text-xl text-gray-600 mb-8",
    textContent: "오류 발생!",
  });

  const NotFoundDescDetail = createElement({
    tagName: "p",
    className: "text-gray-600 mb-8",
    textContent: "의도적인 오류입니다.",
  });

  const NotFoundLink = createElement({
    tagName: "a",
    className:
      "bg-blue-600 text-white px-4 py-2 rounded font-bold cursor-pointer",
    textContent: "홈으로 돌아가기",
  });

  NotFoundLink.addEventListener("click", () => {
    useNavigate("/");
  });

  appendChild({
    parent: ErrorPage,
    children: [
      NotFoundTitle,
      NotFoundNum,
      NotFoundDescTitle,
      NotFoundDescDetail,
      NotFoundLink,
    ],
  });

  return ErrorPage;
}
