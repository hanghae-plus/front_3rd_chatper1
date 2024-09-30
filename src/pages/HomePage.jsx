/** @jsx createVNode */
import { createVNode } from '../lib';
import { globalStore } from '../stores/index.js';
import { Footer, Header, Navigation, Post, PostForm } from '../components/index.js';
import { userStorage } from '../storages/index.js';
import { router } from '../main.jsx';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  const logout = (e) => {
    e.preventDefault();

    globalStore.setState({ currentUser: null, loggedIn: false });
    router.push('/login');
    userStorage.reset();
  };

  const navigate = (e) => {
    e.preventDefault();
    if (e.target.tagName !== 'A' || !e.target.dataset.link) return;

    router.push(e.target.href.replace(window.location.origin, ''));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />

        <Navigation loggedIn={loggedIn} logout={logout} navigate={navigate} />

        <main className="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" className="space-y-4">
            {posts.map(({ id, author, time, content }) => {
              return <Post id={id} author={author} time={time} content={content} />;
            })}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
