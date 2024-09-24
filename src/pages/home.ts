import { BaseComponent } from '../shared/ui/BaseComponent';
import { Footer } from '../shared/ui/Footer';
import { Header } from '../shared/ui/Header';

const ID = {
  HEADER: 'header-container',
  FOOTER: 'footer-container',
};

type Post = {
  id: number;
  user: {
    name: string;
    profileImageUrl: string;
  };
  timestamp: string;
  content: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: '홍길동',
      profileImageUrl: 'https://via.placeholder.com/40',
    },
    timestamp: '5분 전',
    content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!',
  },
  {
    id: 2,
    user: {
      name: '김철수',
      profileImageUrl: 'https://via.placeholder.com/40',
    },
    timestamp: '15분 전',
    content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!',
  },
  {
    id: 3,
    user: {
      name: '이영희',
      profileImageUrl: 'https://via.placeholder.com/40',
    },
    timestamp: '30분 전',
    content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?',
  },
  {
    id: 4,
    user: {
      name: '박민수',
      profileImageUrl: 'https://via.placeholder.com/40',
    },
    timestamp: '1시간 전',
    content: '주말에 등산 가실 분 계신가요? 함께 가요!',
  },
  {
    id: 5,
    user: {
      name: '정수연',
      profileImageUrl: 'https://via.placeholder.com/40',
    },
    timestamp: '2시간 전',
    content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?',
  },
];

export default class HomePage extends BaseComponent<Post[]> {
  constructor(selector: string) {
    super(selector, initialPosts);
  }

  afterRender() {
    new Header(`#${ID.HEADER}`);
    new Footer(`#${ID.FOOTER}`);
  }

  private renderPosts() {
    return this.state
      ?.map(
        ({
          content,
          timestamp,
          user,
        }) => `<div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="${user.profileImageUrl}" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">${user.name}</p>
                <p class="text-sm text-gray-500">${timestamp}</p>
              </div>
            </div>
            <p>${content}</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>`
      )
      .join('');
  }

  template() {
    return `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">

    <div id="${ID.HEADER}"></div>

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${this.renderPosts()}
        </div>
      </main>

      <div id="${ID.FOOTER}"></div>
    </div>
  </div>
`;
  }
}
