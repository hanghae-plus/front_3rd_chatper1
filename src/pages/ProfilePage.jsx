/** @jsx createVNode */
import { createVNode } from '@/lib';
import { Header, Footer, Navigation } from '@/components';
import { userStorage } from '@/storages';
import { updateUserInfo } from '@/main';

export const ProfilePage = () => {
  const { username, bio, email } = userStorage.get();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={!!username} />
        <main className="p-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form" onSubmit={updateUserInfo}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={username}
                  value={username}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={email ?? ''}
                  value={email ?? ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                  자기소개
                </label>
                <textarea id="bio" name="bio" className="w-full p-2 border rounded" rows={4} defaultValue={bio ?? ''} />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded font-bold"
                id="profile-submit-button"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
