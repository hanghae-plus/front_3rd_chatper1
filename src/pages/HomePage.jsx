/** @jsx createVNode */
import { Footer, Header, Navigation, Post, PostForm } from '../components';
import { createVNode } from '../lib';
import { globalStore } from '../stores';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main class="p-4">
          {loggedIn ? <PostForm /> : ''}
          <div id="posts-container" class="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                content={post.content}
                time={post.time}
                author={post.author}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
