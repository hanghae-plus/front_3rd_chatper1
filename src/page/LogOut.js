import { UserStateInstance } from '@/store/Storage.js';
import { ROUTER } from '@/main.js';

export default function HomePage(root) {
	localStorage.removeItem('user');
	alert('로그아웃 되었습니다.');
	ROUTER.navigateTo('/login');
}
