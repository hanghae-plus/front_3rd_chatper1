/** @jsx createVNode */
import { Footer, Header, Navigation } from '../components';
import { Post, PostForm } from '../components/posts';
import { createVNode } from '../lib';
import { globalStore } from '../stores';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();



  return (
    <div className='bg-gray-100 min-h-screen flex justify-center'>
      <div className='max-w-md w-full'>
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className='p-4'>
          <div id='posts-container' className='space-y-4'>
            {loggedIn && <PostForm />}
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                time={post.time}
                content={post.content}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};