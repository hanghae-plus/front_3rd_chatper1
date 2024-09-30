/** @jsx createVNode */
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Post } from "./Post";
import { PostForm } from "./PostForm";
export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn ? <PostForm /> : null}
          <div id="posts-container" className="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                author={post.author}
                time={post.time}
                content={post.content}
                id={post.id}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
