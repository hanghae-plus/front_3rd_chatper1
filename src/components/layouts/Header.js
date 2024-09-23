import userPreferences from '../../utils/UserPreferences.js';

export default class Header {
  constructor({ $element, router }) {
    this.$element = $element;
    this.router = router;
    this.render();
    this.setEvent();
  }

  render() {
    const isLoggedIn = !!userPreferences.get('email');

    this.$element.innerHTML = ` 
    <div>
      <div class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </div>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          ${
            isLoggedIn
              ? `<button id="logout-btn">로그아웃</button>`
              : `<a href="/login" class="text-blue-600">로그인</a>`
          }
          
        </ul>
      </nav>
    </div> 
    `;
    this.setEvent();
  }

  setEvent() {
    this.$element.querySelector('nav').addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        this.router.navigateTo(e.target.getAttribute('href'));
      } else if (e.target.id === 'logout-btn') {
        userPreferences.set('email', undefined);
        userPreferences.set('username', undefined);
        userPreferences.set('bio', undefined);
        this.router.navigateTo('/login');
      }
    });
  }
}
