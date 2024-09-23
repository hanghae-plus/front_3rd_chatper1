import Component from "../core/component";

export default class Post extends Component{
    state: { src: string, name: string, time: string, sentence: string }
    init(){
        this.render()
    }

    template(): string {
        return `
              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="${this.state.src}" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">${this.state.name}</p>
                    <p class="text-sm text-gray-500">${this.state.time}</p>
                  </div>
                </div>
                <p>${this.state.sentence}</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>
        `
    }
}