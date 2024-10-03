/** @jsx createVNode */
import { createVNode } from "../lib";
import { Header, Footer, Navigation } from "../components/templates";
import { globalStore } from "../stores";
import { Post } from "../components/posts/Post";
import { PostForm } from "../components";

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
            {posts.map((post) => (
              <Post {...post} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
