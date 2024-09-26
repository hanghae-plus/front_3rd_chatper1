import errorBoundary from './module/errorBoundary';
import { setStoreState } from './module/store';
import { useRouter } from './module/route';
import App from './page/app';

const storedData = localStorage.getItem('user');
const initialData = { username: '', email: '', bio: '' };
const userData = storedData ? JSON.parse(storedData) : initialData;
setStoreState('userData', userData);

App.init();

const router = useRouter();
router.push(location.pathname);

errorBoundary();
