export default class Post {
  constructor(username, time, content) {
    this.username = username;
    this.time = time;
    this.content = content;
  }

  render() {
    return `
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
          <div>
            <p class="font-bold">${this.username}</p>
            <p class="text-sm text-gray-500">${this.time}</p>
          </div>
        </div>
        <p>${this.content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    `;
  }
}
