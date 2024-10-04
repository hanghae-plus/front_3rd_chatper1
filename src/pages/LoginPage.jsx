import { createVNode } from '../lib';
import { userStorage } from '../storages';
import { globalStore } from '../stores';

export const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();

    userStorage.set({ username, email: '', bio: '' });
    globalStore.setState({
      currentUser: userStorage.get(),
      loggedIn: true,
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="form-container">
        <h1 className="form-header">항해플러스</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="사용자 이름"
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="form-input mb-6"
            required
          />
          <button type="submit" className="form-button">로그인</button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="link">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <hr className="form-divider" />
        <div className="text-center">
          <button className="new-account-button">새 계정 만들기</button>
        </div>
      </div>
    </div>
  );
};