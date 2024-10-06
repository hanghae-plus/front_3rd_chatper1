/** @jsx createVNode */
import { Footer, Header, Navigation, Post } from "../components";
import { createVNode } from "../lib";
import { globalStore } from "../stores/globalStore";
import { NotFoundPage } from "./NotFoundPage";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {Header()}
        {Navigation({ loggedIn })}
        <main class="p-4">
          <div id="posts-container" class="space-y-4">
            {posts.map(Post)}
          </div>
        </main>
        {Footer()}
      </div>
    </div>
  );
};
