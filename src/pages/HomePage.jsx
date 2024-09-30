/** @jsx createVNode */
import { createVNode } from "../lib";

import { Post, PostForm } from "@/components";

import { globalStore } from "@/stores/globalStore";

export function HomePage() {
  const { getState } = globalStore;
  const { loggedIn, posts } = getState();

  return (
    <div>
      {loggedIn && <PostForm />}
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
