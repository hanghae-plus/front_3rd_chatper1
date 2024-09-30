/** @jsx createVNode */
import { Header, Navigation } from "../components";
import { globalStore } from "../stores";

export const ProfilePage = () => {
  const { currentUser } = globalStore.getState();
  const { username = '', email = '', bio = '' } = currentUser ?? {};
  const { loggedIn } = globalStore.getState(); 

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">

        {<Header/>} 
        {<Navigation loggedIn={loggedIn}/>} 

        <main className="p-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border rounded"
                  defaultValue={username}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded"
                  defaultValue={email}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className="w-full p-2 border rounded"
                  defaultValue={bio}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>
        {<Footer/>} 
      </div>
    </div>
  );
};
