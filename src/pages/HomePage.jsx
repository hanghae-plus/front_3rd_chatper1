/** @jsx createVNode */
import { globalStore } from '../stores/globalStore';
import { Footer, Header, Navigation, Post, PostForm } from '../components';
import { createVNode } from '../lib';

const lastNameList = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  const addPost = ({ content }) => {
    const { posts } = globalStore.getState();
    const newPost = {
      id: posts.length + 1,
      author: `${lastNameList[Math.floor(Math.random() * lastNameList.length)]}항해`,
      time: Intl.DateTimeFormat('ko', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date()),
      content,
    };
    globalStore.setState({ posts: [...posts, newPost] });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn ? <PostForm onSubmit={addPost} /> : null}
          <div id="posts-container" className="space-y-4">
            {posts.map(Post)}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
