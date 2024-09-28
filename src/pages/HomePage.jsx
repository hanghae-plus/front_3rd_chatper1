/** @jsx createVNode */
import { createVNode } from "../lib";

import { Footer, Header, Navigation, Post, PostForm } from "../components";
import { globalStore } from "../stores";

const addPost = (content) => {
  const { currentUser, posts } = globalStore.getState();
  globalStore.setState({
    posts: [
      ...posts,
      {
        id: Date.now(),
        author: currentUser.username,
        time: '방금 전',
        content: content
      }
    ]
  })

  console.log(globalStore.getState());
}

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />

        <main className="p-4">
          {loggedIn && <PostForm onSubmit={addPost} />}
          <div id="posts-container" className="space-y-4">
            {posts.map((props) => <Post {...props} />)}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
