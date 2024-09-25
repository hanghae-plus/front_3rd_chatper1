export const Error = () => {
  const getHTML = () => {
    const main = document.createElement("main");
    main.setAttribute(
      "class",
      "bg-gray-100 flex items-center justify-center min-h-screen"
    );

    const container = document.createElement("div");
    container.setAttribute(
      "class",
      "bg-white p-8 rounded-lg shadow-md w-full text-center"
    );
    container.setAttribute("style", "max-width: 480px");

    // 제목 생성
    const title = document.createElement("h1");
    title.setAttribute("class", "text-2xl font-bold text-blue-600 mb-4");
    title.textContent = "항해플러스";

    // 404 메시지 생성
    const errorCode = document.createElement("p");
    errorCode.setAttribute("class", "text-4xl font-bold text-gray-800 mb-4");
    errorCode.textContent = "404";

    // 설명 문구 생성
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "text-xl text-gray-600 mb-8");
    errorMessage.textContent = "페이지를 찾을 수 없습니다";

    const errorDescription = document.createElement("p");
    errorDescription.setAttribute("class", "text-gray-600 mb-8");
    errorDescription.textContent =
      "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.";

    // 홈으로 돌아가기 버튼 생성
    const homeLink = document.createElement("a");
    homeLink.setAttribute("href", "/");
    homeLink.setAttribute(
      "class",
      "bg-blue-600 text-white px-4 py-2 rounded font-bold"
    );
    homeLink.textContent = "홈으로 돌아가기";

    // 컨테이너에 모든 요소 추가
    container.appendChild(title);
    container.appendChild(errorCode);
    container.appendChild(errorMessage);
    container.appendChild(errorDescription);
    container.appendChild(homeLink);

    // main 요소에 컨테이너 추가
    main.appendChild(container);

    return main;
  };
  return { getHTML };
};
