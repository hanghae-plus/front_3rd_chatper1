/** @jsx createVNode */
import { createVNode } from "../lib";
import { Footer, Header, Navigation, Post, PostForm } from "../components";
import { globalStore } from "../stores";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header loggedIn={loggedIn} />
        <Navigation loggedIn={loggedIn} />

        <main className="p-4">
          {/* todo */}
          {/* {loggedIn && <PostForm onSubmit={addPost} />} */}
          <div id="posts-container" className="space-y-4">
            {posts.map((props) => (
              <Post {...props} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
