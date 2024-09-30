/** @jsx createVNode */
import { Footer, Header, Navigation, Post, PostForm } from "../components";
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import React from "react";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div>
      <div class="max-w-md w-full">
        <Header />
        <Navigation />
        <main class="p-4">
          <div id="posts-container" class="space-y-4">
            {/* <PostForm /> */}
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
