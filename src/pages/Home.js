import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Post from '../components/Post.js';

export default class Home {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.posts = [
      new Post('홍길동', '5분 전', '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!'),
      new Post('김철수', '15분 전', '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!'),
      new Post('이영희', '30분 전', '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?'),
      new Post('박민수', '1시간 전', '주말에 등산 가실 분 계신가요? 함께 가요!'),
      new Post('정수연', '2시간 전', '새로 나온 영화 재미있대요. 같이 보러 갈 사람?'),
    ];
  }

  init() {
    this.header.init();
  }

  render() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${this.header.render()}
          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>
            <div class="space-y-4">
              ${this.posts.map((post) => post.render()).join('')}
            </div>
          </main>
          ${this.footer.render()}
        </div>
      </div>
    `;
  }
}
