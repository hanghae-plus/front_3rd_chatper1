/** @jsx createVNode */
import{ createVNode } from "../lib";
import { router } from "../main";
import { userStorage } from "../storages";
import { globalStore } from "../stores";


const login = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;

    const user = {
        username,
        email: '',
        bio: '',
    };
    userStorage.set(user);
    globalStore.setState({ currentUser: user, loggedIn: true });
    router.push('/profile');
}


export const LoginPage = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
            <form id="login-form" onSubmit={login}>
                <input type="text" id="username" placeholder="사용자 이름" className="w-full p-2 mb-4 border rounded" required />
                <input type="password" placeholder="비밀번호" className="w-full p-2 mb-6 border rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">로그인</button>
            </form>
            <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
            </div>
            <hr className="my-6" />
            <div className="text-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded">새 계정 만들기</button>
            </div>
            </div>
        </div>
    )
};
