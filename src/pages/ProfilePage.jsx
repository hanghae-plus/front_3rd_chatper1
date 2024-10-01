/** @jsx createVNode */
import { Footer } from '../components/templates/Footer';
import { Header } from '../components/templates/Header';
import { Navigation } from '../components/templates/Navigation';
import { createElement, createVNode } from '../lib';
import { userStorage } from '../storages';
import { globalStore } from '../stores';

export const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username = '', email = '', bio = '' } = currentUser ?? {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsername = document.getElementById('username').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedBio = document.getElementById('bio').value;

    console.log('Updated bio:', updatedBio); // 디버깅 로그

    const updatedUser = {
      ...currentUser,
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    };

    console.log('Updated user object:', updatedUser); // 디버깅 로그

    // Update global store
    globalStore.setState({ currentUser: updatedUser });

    // Update user storage
    userStorage.set(updatedUser);

    console.log('Profile updated successfully');
    console.log('Current state after update:', globalStore.getState()); // 디버깅 로그
  };

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center'>
      <div className='max-w-md w-full'>
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className='p-4'>
          <div className='bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-center text-blue-600 mb-8'>
              내 프로필
            </h2>
            <form id='profile-form' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='username'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  사용자 이름
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  className='w-full p-2 border rounded'
                  value={username}
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  이메일
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full p-2 border rounded'
                  value={email}
                  required
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='bio'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  자기소개
                </label>
                <textarea
                  id='bio'
                  name='bio'
                  rows='4'
                  className='w-full p-2 border rounded'
                  defaultValue={bio}
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white p-2 rounded font-bold'
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

// 전역 상태 변경 시 리렌더링
globalStore.subscribe((newState) => {
  if (newState && newState.currentUser) {
    const root = document.getElementById('root');
    if (root) {
      const newProfilePage = ProfilePage();
      const newProfileNode = createElement(newProfilePage);
      root.innerHTML = '';
      root.appendChild(newProfileNode);
    }
  }
});