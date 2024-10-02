/** @jsx createVNode */
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { Header, Footer, Navigation, PostForm, Post } from "../components";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main class="p-4">
          {loggedIn ? <PostForm /> : ""}
          <div id="posts-container" class="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
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
