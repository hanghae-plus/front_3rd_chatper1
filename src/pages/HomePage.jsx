/** @jsx createVNode */
import { Navigation } from '../components/templates/Navigation';
import { Header } from '../components/templates/Header';
import { Footer } from '../components/templates/Footer';
import { Post, PostForm } from '../components/posts';
import { globalStore } from '../stores/globalStore';
import { createVNode } from '../lib';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center'>
      <div className='max-w-md w-full'>
        <Header />
        <Navigation loggedIn={loggedIn} />

        <main className='p-4'>
          {loggedIn ? <PostForm /> : null}
          <div id='posts-container' className='space-y-4'>
            {posts.map((post, index) => (
              <Post key={index} {...post} /> // 각 post 객체의 속성을 props로 전달
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
