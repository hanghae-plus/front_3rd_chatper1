import Footer from "../components/Footer";
import Header from "../components/Header";
import ThinkCard from "../components/ThinkCard";
import BasePage from "../base/BasePage";

export default class HomePage extends BasePage {
  constructor({ props, onLogout }) {
    super({ props, onLogout });
  }

  init() {
    this.header = new Header({
      props: this.props,
      onLogout: this.onLogout,
    });

    this.footer = new Footer();
    this.state = {
      thinkInfo: [
        {
          imgUrl: "https://via.placeholder.com/40",
          name: "홍길동",
          ago: 5,
          think: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
        },
        {
          imgUrl: "https://via.placeholder.com/40",
          name: "김철수",
          ago: 15,
          think: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
        },
        {
          imgUrl: "https://via.placeholder.com/40",
          name: "이영희",
          ago: 30,
          think: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
        },
        {
          imgUrl: "https://via.placeholder.com/40",
          name: "박민수",
          ago: 66,
          think: "주말에 등산 가실 분 계신가요? 함께 가요!",
        },
        {
          imgUrl: "https://via.placeholder.com/40",
          name: "정수연",
          ago: 120,
          think: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
        },
      ],
    };
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${this.header.template()}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${this.state.thinkInfo
              .map((info) => {
                const thinkCard = new ThinkCard({ props: info });

                return thinkCard.template();
              })
              .join("")}
          </div>
        </main>

        ${this.footer.template()}
      </div>
    `;
  }

  update(newState) {
    super.update(newState);

    this.header.update(newState);
  }

  render() {
    super.render();

    this.header.render();
    this.footer.render();
  }
}
