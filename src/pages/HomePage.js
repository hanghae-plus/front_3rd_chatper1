import Footer from "../components/Footer";
import Header from "../components/Header";
import ThinkCard from "../components/ThinkCard";

import AbstractComponent from "../abstract/AbstractComponent";
const thinkInfo = [
  {
    id: 0,
    imgUrl: "https://via.placeholder.com/40",
    name: "홍길동",
    ago: 5,
    think: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
  },
  {
    id: 1,
    imgUrl: "https://via.placeholder.com/40",
    name: "김철수",
    ago: 15,
    think: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
  },
  {
    id: 2,
    imgUrl: "https://via.placeholder.com/40",
    name: "이영희",
    ago: 30,
    think: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
  },
  {
    id: 3,
    imgUrl: "https://via.placeholder.com/40",
    name: "박민수",
    ago: 66,
    think: "주말에 등산 가실 분 계신가요? 함께 가요!",
  },
  {
    id: 4,
    imgUrl: "https://via.placeholder.com/40",
    name: "정수연",
    ago: 120,
    think: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
  },
];

export default class HomePage extends AbstractComponent {
  constructor(elementId) {
    super(elementId);
  }

  beforeMount() {
    this.thinkCardTemplate = thinkInfo.map((think) => {
      return `<div id=think-${think.id}></div>`;
    });
  }

  mount() {
    const $header = document.getElementById("header");
    new Header($header);

    thinkInfo.forEach((think) => {
      const $thinkCard = document.getElementById(`think-${think.id}`);
      new ThinkCard($thinkCard, think);
    });

    const $footer = document.getElementById("footer");
    new Footer($footer);
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        <div id='header'></div>

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${this.thinkCardTemplate.map((template) => template).join("")}
          </div>
        </main>

        <footer id='footer'></footer>
      </div>
    `;
  }
}
