/** @jsx createVNode */
import { createVNode } from '../lib';
import { globalStore } from '../stores/index.js';
import { Footer, Header, Navigation, Post, PostForm } from '../components/index.js';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        {Header()}
        {Navigation({ loggedIn })}

        <main className="p-4">
          {loggedIn && <PostForm />}
          <div id="posts-container" className="space-y-4">
            {posts.map(({ id, author, time, content }) => {
              return (
                <Post id={id} author={author} time={time} content={content} />
              );
            })}
          </div>
        </main>

        {Footer()}
      </div>
    </div>
  );
};
