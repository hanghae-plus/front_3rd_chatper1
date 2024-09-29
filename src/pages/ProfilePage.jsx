/** @jsx createVNode */
import { Header, Navigation, Footer } from "../components/templates";
import { createVNode } from "../lib";
import { userStorage } from "../storages";
import { globalStore } from "../stores";

const updateProfile = (user) => {
    const currentUser = { ...globalStore.getState().currentUser, ...user };
    globalStore.setState({ currentUser });
    userStorage.set(currentUser);
    alert('프로필이 업데이트되었습니다.');
}

export const ProfilePage = () => {
    const { currentUser, loggedIn } = globalStore.getState();
    const { username = "", email = "", bio = "" } = currentUser ?? {};

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValue = Object.fromEntries(formData);
        updateProfile(formValue);
    }

    return (
        <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                <Header />    
                <Navigation loggedIn={loggedIn}/>
                <main class="p-4">
                    <div class="bg-white p-8 rounded-lg shadow-md">
                        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                        <form id="profile-form" onSubmit={handleProfileSubmit}>
                            <div class="mb-4">
                                <label htmlFor="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                                <input type="text" id="username" name="username" class="w-full p-2 border rounded" value={username} required />
                            </div>
                            <div class="mb-4">
                                <label htmlFor="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                                <input type="email" id="email" name="email" class="w-full p-2 border rounded" value={email} />
                            </div>
                            <div class="mb-6">
                                <label htmlFor="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">{bio}</textarea>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};
