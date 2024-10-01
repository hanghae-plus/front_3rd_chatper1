/** @jsx createVNode */
import { createVNode } from '../lib';
import { globalStore } from '../stores';
import { Header, Navigation, Post, Footer } from '../components';
import { NotFoundPage } from '../pages';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center'>
      <div className='max-w-md w-full'>
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className='p-4'>
          {loggedIn ? <NotFoundPage /> : ''}
          <div id='posts-container' className='space-y-4'>
            {posts.map((post) => (
              <Post
                author={post.author}
                time={post.time}
                content={post.content}
                id={post.id}
                key={post.id}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
