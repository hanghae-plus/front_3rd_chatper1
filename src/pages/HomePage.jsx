/** @jsx createVNode */
import { createVNode } from "../lib/createVNode.js";
import { globalStore } from "../stores/globalStore.js";
import { Footer, Header, Navigation, Post, PostForm } from "../components/index.js";

// HomePage 컴포넌트
export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" className="space-y-4">
            {posts.map(({ id, author, content, time }) => (
              <Post
                key={id}
                id={id}
                author={author}
                content={content}
                time={time}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
