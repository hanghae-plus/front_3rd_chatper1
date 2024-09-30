/** @jsx createVNode */
import { createVNode } from "../lib";

import { Post, PostForm } from "@/components";

import { globalStore } from "@/stores/globalStore";
import { Header, Navigation, Footer } from "../components";

export function HomePage() {
  const { getState } = globalStore;
  const { loggedIn, posts } = getState();

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Navigation />
        <main class="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" class="space-y-4">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
