/** @jsx createVNode */
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { Header, Navigation, Footer } from "../components/templates";
import { PostForm, Post } from "../components/posts";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div classsName="bg-gray-100 min-h-screen flex justify-center">
      <div classsName="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main classsName="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" classsName="space-y-4">
            {posts.map(({ id, author, time, content }) => {
              return (
                <Post id={id} author={author} time={time} content={content} />
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
