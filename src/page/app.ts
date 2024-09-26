import Footer from '../component/footer';
import Header from '../component/header';
import { useRouter } from '../module/route';
import { isEqual } from '../module/util';
import { RouteType, UserDataType } from '../type';
import { getStoreState, resetStoreState, setStoreState } from '../module/store';
import Application from '../core/application';

class App extends Application {
  private static _instance: App;
  public static instance(): App {
    if (!App._instance) App._instance = new App();
    return App._instance;
  }
  currentRoute: RouteType;
  header: Header;
  footer: Footer;

  constructor() {
    super();
    App._instance = this;
  }

  init() {
    this.bound('clickEvent', this.clickEvent);
    this.bound('submitEvent', this.submitEvent);
    this.root.innerHTML = this.template();
    this.header = new Header('header');
    this.footer = new Footer('footer');
  }

  render(route: RouteType) {
    if (isEqual(this.currentRoute, route) || !route?.element) return;
    this.currentRoute = route;
    const layoutEvent = route.layout ? 'render' : 'destroy';
    this.header[layoutEvent]();
    this.footer[layoutEvent]();
    route.element.render();
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.removeEventListener('click', this.boundFc['clickEvent']);
    document.addEventListener('click', this.boundFc['clickEvent']);
    document.removeEventListener('submit', this.boundFc['submitEvent']);
    document.addEventListener('submit', this.boundFc['submitEvent']);
  }

  clickEvent(e: MouseEvent) {
    const router = useRouter();
    const target = e.target as Element;

    // a 태그에 대한 click 처리
    if (target.tagName === 'A') e.preventDefault();

    // 라우터 이동 이벤트
    const path = target.getAttribute('data-path');
    if (path) router.push(path);

    // 로그아웃 이벤트
    const buttonType = target.getAttribute('data-button');
    if (buttonType == 'logout') {
      localStorage.removeItem('user');
      resetStoreState('userData');
      router.push('/login');
    }
  }

  // submit 이벤트
  submitEvent(e: MouseEvent) {
    e.preventDefault();
    const target = e.target as Element;
    const formName = target.getAttribute('data-form');
    if (formName == 'login') this.submitLoginForm();
    if (formName == 'profile') this.submitProfileForm();
  }

  submitLoginForm() {
    const router = useRouter();
    const usernameDiv = document.querySelector('#username') as HTMLInputElement;
    const username = usernameDiv.value;
    this.saveData({ username, email: '', bio: '' });
    router.push('/profile');
  }

  submitProfileForm() {
    const inputs = ['#username', '#email', '#bio'];
    const [username, email, bio] = inputs.map(
      (id) => (document.querySelector(id) as HTMLInputElement).value
    );
    this.saveData({ username, email, bio });
    alert('프로필 업데이트');
  }

  saveData(userData: UserDataType) {
    const storedUserData = getStoreState('userData');
    if (isEqual(userData, storedUserData)) return;
    setStoreState('userData', userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  template() {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
          <div id="header"></div>
            <main id="main" ></main>
          <div id="footer" ></div>
      </div>
    </div>
        `;
  }
}

export default App.instance();
