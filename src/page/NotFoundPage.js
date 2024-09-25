export default function NotFound() {
  return `
     <main class="p-4">
       <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600">항해플러스</h1>
        <p class="text-4xl font-bold my-4">404</p>
        <p>페이지를 찾을 수 없습니다.</p>
        <p class="my-5 text-sm text-gray-400">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <button id="HomeButton" class="text-white bg-blue-600 px-3 py-2 rounded-md">홈으로 돌아가기</button>
      </main>
    `;
}

export const routingHome = () => {
  document.getElementById("HomeButton").addEventListener("click", () => {
    history.pushState({}, "", "/");
  });
};
