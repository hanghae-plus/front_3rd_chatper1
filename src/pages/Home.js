import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/Post';
import PostForm from '../components/PostForm';

const Home = () => `
<div class="bg-gray-100 min-h-screen flex justify-center">
  <div class="max-w-md w-full">
  ${Header({ isLogged: false })}
    <main class="p-4">
    ${PostForm()}
      <div class="space-y-4">
      ${Post({ name: '홍길동', content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!', date: '5분 전' })}
      ${Post({ name: '김철수', content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!', date: '15분 전' })}
      ${Post({ name: '이영희', content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?', date: '30분 전' })}
      ${Post({ name: '박민수', content: '주말에 등산 가실 분 계신가요? 함께 가요!', date: '1시간 전' })}
      ${Post({ name: '정수연', content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?', date: '2시간 전' })}
      </div>
    </main>
    ${Footer()}
  </div>
</div>
`;

export default Home;
