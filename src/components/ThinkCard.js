import AbstractComponent from "../abstract/AbstractComponent";

const transAgo = (minute) => {
  if (minute < 60) {
    return `${minute}분 전`;
  }
  if (minute >= 60) {
    const h = Math.round(minute / 60);
    const min = minute % 60;
    if (min === 0) {
      return `${h}시간 전`;
    }
    return `${h}시간 ${min}분 전`;
  }
};

export default class ThinkCard extends AbstractComponent {
  constructor(elementId, ...args) {
    super(elementId, ...args);
  }

  template() {
    const { imgUrl, name, ago, think } = this.props;

    return `
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img src=${imgUrl} alt="프로필" class="rounded-full mr-2">
          <div>
            <p class="font-bold">${name}</p>
            <p class="text-sm text-gray-500">${transAgo(ago)}</p>
          </div>
        </div>
        <p>${think}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    `;
  }
}
