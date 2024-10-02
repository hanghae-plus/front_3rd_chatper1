/** @jsx createVNode */
import { Footer, Header, Navigation, Post, PostForm } from '@/components';
import { createVNode } from '@/lib';
import { globalStore } from '@/stores';

export const HomePage = () => {
  const posts = globalStore.getState().posts;
  const loggedIn = globalStore.getState().loggedIn;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn && <PostForm />}
          <Post posts={posts} />
        </main>
        <Footer />
      </div>
    </div>
  );
};
