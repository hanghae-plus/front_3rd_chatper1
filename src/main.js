import router from './router';
import App from './components/App';

const app = new App({
  $target: document.getElementById('root'),
  router,
});

app.mount();
