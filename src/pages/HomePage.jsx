/** @jsx createVNode */
import { createVNode } from '../lib';
import { globalStore } from '../stores/index.js';
import { Footer, Header, Navigation, Post, PostForm } from '../components';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          <div id="posts-container" className="space-y-4">
            {loggedIn && <PostForm />}
            {posts.map((data) => {
              return (
                <Post id={data.id} author={data.author} content={data.content} time={data.time} />
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
