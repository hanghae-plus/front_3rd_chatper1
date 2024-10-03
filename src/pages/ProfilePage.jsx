/** @jsx createVNode */
import { Footer, Header, Navigation } from '../components';
import { createVNode } from '../lib';
import { userStorage } from '../storages';
import { globalStore } from '../stores';

const saveProfile = ({ username, email, bio }) => {
  userStorage.set({ username, email, bio });
  globalStore.setState({ currentUser: { username, email, bio } });
  globalStore.setState({ loggedIn: true });
  alert('수정 완료');
};

export const ProfilePage = () => {
  const { currentUser, loggedIn } = globalStore.getState();
  const { username, email, bio } = currentUser;

  const createLabelInput = (name, label, value, type = 'text') => (
    <div className="mb-4">
      <label for={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input type={type} id={name} name={name} value={value ? value : ''} className="w-full p-2 border rounded" />
    </div>
  );

  const updateProfile = ({ target }) => {
    const formData = new FormData(target);
    const [username, email, bio] = ['username', 'email', 'bio'].map((e) => formData.get(e));
    const editData = { username, email, bio };
    const { currentUser } = globalStore.getState();
    const isEqual = Object.keys(currentUser).every((key) => currentUser[key] === editData[key]);
    if (isEqual) alert('수정된 데이터 없음');
    else saveProfile({ username, email, bio });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full min-h-screen">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form" onSubmit={updateProfile}>
              {createLabelInput('username', '사용자 이름', username)}
              {createLabelInput('email', '이메일', email)}

              <div className="mb-6">
                <label for="bio" className="block text-gray-700 text-sm font-bold mb-2">
                  자기소개
                </label>
                <textarea id="bio" name="bio" rows="4" className="w-full p-2 border rounded">
                  {bio ? bio : ''}
                </textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">
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
