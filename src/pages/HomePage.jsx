/** @jsx createVNode */
import { createVNode } from "../lib";
import { Navigation } from "../components/templates/Navigation";
import { Footer, Header, Post } from "../components";
import { globalStore } from "../stores";

export const HomePage = () => {
  const { postsItems } = globalStore.getState();
  return (
    <div>
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4">
          <div id="posts-container" className="space-y-4">
            {postsItems.map(({ author, time, content, id }) => (
              <Post postId={id} author={author} time={time} content={content} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};