import { USERNAME } from "../constants";
import userStore from "./userStore";

const getRandomId = () => {
  return Math.round(Math.random() * 1000);
};

const initialState = () => {
  return [
    {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: "홍길동",
      ago: 5,
      think: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    },
    {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: "김철수",
      ago: 15,
      think: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
    },
    {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: "이영희",
      ago: 30,
      think: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
    },
    {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: "박민수",
      ago: 66,
      think: "주말에 등산 가실 분 계신가요? 함께 가요!",
    },
    {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: "정수연",
      ago: 120,
      think: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
    },
  ];
};

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(think) {
    const newThink = {
      id: getRandomId(),
      imgUrl: "https://via.placeholder.com/40",
      name: userStore.getState()[USERNAME],
      ago: 5,
      think,
    };
    this.state = [newThink, ...this.getState()];

    this.listeners.forEach((listener) => listener.render());
  }

  clear() {
    this.setState(initialState());

    this.listeners.forEach((listener) => listener.render());
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }
}

const thinkStore = new Store(initialState());

export default thinkStore;
