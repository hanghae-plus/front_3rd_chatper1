/** @jsx createVNode */
import { createVNode } from "../lib";
import { globalStore } from "../stores/globalStore";
import { Header } from "../components/templates/Header";
import { Footer } from "../components/templates/Footer";
import { Navigation } from "../components/templates/Navigation";
import { Post } from "../components";
import { NotFoundPage } from "./NotFoundPage";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main class="p-4">
          {loggedIn ? <NotFoundPage /> : ""}
          <div id="posts-container" class="space-y-4">
            {posts.map(({ author, content, id, time }) => (
              <Post author={author} content={content} id={id} time={time} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
