/** @jsx createVNode */
import { globalStore } from "../stores";
import { createVNode } from "../lib";
import { Header } from "../components/templates/Header";
import { Footer } from "../components/templates/Footer";
import { Navigation } from "../components/templates/Navigation";
import { PostForm } from "../components/posts/PostForm";
import { Post } from "../components/posts/Post";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" className="space-y-4">
            {posts.map(({ id, author, time, content }) => (
              <Post postId={id} author={author} time={time} content={content} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
