import { useRouter } from "../module/route";
import Component from "../core/component";
import store from "../module/store";

const router = useRouter();

export default class Header extends Component{
    init(){
        this.container.className="sticky top-0"
        this.state = { pathname: location.pathname }
        this.render()
    }

    attachEventListeners() {
        const btnList = document.querySelectorAll('[data-path]')
        btnList.forEach( button => {
            button.addEventListener('click', function (event) {
                event.preventDefault()
                const path = button.getAttribute('data-path')
                if(path) router.push(path)
            })
        })
    }

    template(){
        return `
            <header class="bg-blue-600 text-white p-4">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2">
                <ul class="flex justify-around">
                <li class="w-full"><a href="/" class="block w-full text-center ${this.state['pathname']=='/' ? 'text-blue-600 font-bold':'text-gray-600'}">홈</a></li>
                
                ${
                    store.state.username ? 
                    `<li class="w-full"><a href="/profile" class="block w-full text-center ${this.state['pathname']=='/profile'?'text-blue-600 font-bold':'text-gray-600'}">프로필</a></li>
                    <li class="w-full"><button id="logout" data-path="/logout" class="w-full text-center text-gray-600"> 로그아웃 </button> </li>`
                    :
                    `<li class="w-full"><a href="/login" class="block w-full text-center text-gray-600">로그인</a></li>`
                }
                </ul>
            </nav>
        `
    }
}

