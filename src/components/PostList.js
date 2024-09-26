import { Post } from './Post.js';

// 게시물 목록 컴포넌트
export const PostList = () => {
  const posts = [
    {
      username: '홍길동',
      time: '5분 전',
      content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!',
    },
    {
      username: '김철수',
      time: '15분 전',
      content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!',
    },
    {
      username: '이영희',
      time: '30분 전',
      content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?',
    },
    {
      username: '박민수',
      time: '1시간 전',
      content: '주말에 등산 가실 분 계신가요? 함께 가요!',
    },
    {
      username: '정수연',
      time: '2시간 전',
      content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?',
    },
  ];

  return posts.map((post) => Post(post)).join('');
};
