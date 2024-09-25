import ErrorBoundary from './components/ErrorBoundary';
import router from './router';

window.addEventListener('error', (event) => {
  const errorMessage = event.error.message || '알 수 없는 에러입니다.';

  document.querySelector('#root').innerHTML = ErrorBoundary({ errorMessage });
});
window.addEventListener('popstate', () => router.push());

router.push();
