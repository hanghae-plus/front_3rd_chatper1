export default function NotFound() {
  const NotFound = document.createElement("main");
  NotFound.setAttribute(
    "class",
    "bg-white p-8 rounded-lg shadow-md w-full text-center max-w-[480px]"
  );

  const NotFoundTitle = document.createElement("h1");
  NotFoundTitle.className = "text-2xl font-bold text-blue-600 mb-4 ";
  NotFoundTitle.textContent = "항해 플러스";

  const NotFoundNum = document.createElement("p");
  NotFoundNum.className = "text-4xl font-bold text-gray-800 mb-4";
  NotFoundNum.textContent = "404";

  const NotFoundDescTitle = document.createElement("p");
  NotFoundDescTitle.className = "text-xl text-gray-600 mb-8";
  NotFoundDescTitle.textContent = "페이지를 찾을 수 없습니다";

  const NotFoundDescDetail = document.createElement("p");
  NotFoundDescDetail.className = "text-gray-600 mb-8";
  NotFoundDescDetail.textContent =
    "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.";

  const NotFoundLink = document.createElement("a");
  NotFoundLink.className = "bg-blue-600 text-white px-4 py-2 rounded font-bold";
  NotFoundLink.setAttribute("href", "#main");
  NotFoundLink.textContent = "홈으로 돌아가기";

  NotFound.appendChild(NotFoundTitle);
  NotFound.appendChild(NotFoundNum);
  NotFound.appendChild(NotFoundDescTitle);
  NotFound.appendChild(NotFoundDescDetail);
  NotFound.appendChild(NotFoundLink);

  return NotFound;
}
