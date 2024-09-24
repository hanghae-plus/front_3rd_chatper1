import Header from '../component/header';
import Footer from '../component/footer';
import Component from '../core/component';
import Post from '../component/post';

const postData = [
  {
    src: 'https://via.placeholder.com/40',
    name: '홍길동',
    time: '5분 전',
    sentence: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!',
  },
  {
    src: 'https://via.placeholder.com/40',
    name: '김철수',
    time: '15분 전',
    sentence: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!',
  },
  {
    src: 'https://via.placeholder.com/40',
    name: '이영희',
    time: '30분 전',
    sentence: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?',
  },
  {
    src: 'https://via.placeholder.com/40',
    name: '박민수',
    time: '1시간 전',
    sentence: '주말에 등산 가실 분 계신가요? 함께 가요!',
  },
  {
    src: 'https://via.placeholder.com/40',
    name: '정수연',
    time: '2시간 전',
    sentence: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?',
  },
];

export default class HomePage extends Component {
  mounted() {
    new Header('header');
    new Footer('footer');
    postData.map((data, i) => new Post(`content-${i}`, data));
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id="header"></div>
          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              ${postData
                .map((_e, i) => `<div id="content-${i}"></div>`)
                .join('')}
            </div>
          </main>
          <div id="footer" ></div>
        </div>
      </div>
`;
  }
}
