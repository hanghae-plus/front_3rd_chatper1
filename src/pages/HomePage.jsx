/** @jsx createVNode */
import { createVNode } from '../lib';
import { globalStore } from '../stores/globalStore';
import { Header, Navigation, Footer } from '../components/templates';
import { Post, PostForm } from '../components/posts';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" className="space-y-4">
            {posts &&
              posts.map((post) => (
                <Post
                  id={post.id}
                  author={post.author}
                  time={post.time}
                  content={post.content}
                />
              ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
