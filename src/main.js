import { useRouter } from './module/route'
import HomePage from "./page/homePage"
import LoginPage from "./page/loginPage"
import ProfilePage from "./page/profilePage"
import NotFoundPage from "./page/notFoundPage"

const router = useRouter()
router.addRoute('/', new HomePage('root') )
router.addRoute('/login', new LoginPage('root'))
router.addRoute('/profile', new ProfilePage('root'))
router.addRoute('/404', new NotFoundPage('root') )
router.push(location.pathname)

window.addEventListener('error', error=>{
    // 에러 UI 표시
    const root = document.getElementById('root')
    root.innerHTML = ''
    const errorComponent = document.createElement('div');
    errorComponent.innerHTML = `<p style="color:red;">오류 발생! ${error.message}</p>`;
    root.appendChild(errorComponent);
    console.log('*****************************************************',{root:root.innerHTML})
    return true
})