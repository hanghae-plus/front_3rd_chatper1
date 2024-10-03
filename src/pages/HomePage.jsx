/** @jsx createVNode */
import { createVNode } from "../lib";
import { Navigation } from "../components/templates/Navigation";
import { Footer, Header, Post, PostForm } from "../components";
import { globalStore } from "../stores";

export const HomePage = () => {
  const { posts } = globalStore.getState();
  return (
    <div>
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4">
          {/* <PostForm /> */}
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
