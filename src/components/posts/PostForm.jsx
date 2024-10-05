/** @jsx createVNode */
import { createVNode } from '../../lib';
import { globalStore } from '../../stores';

export const PostForm = () => {
  const submitPost = ({ target }) => {
    const { postContent } = target.elements;
    const { currentUser, posts } = globalStore.getState();

    const newPost = [
      {
        id: posts.length + 1,
        author: currentUser.username,
        time: '방금',
        content: postContent.value,
      },
      ...posts,
    ];
    globalStore.setState({ posts: newPost });
    postContent.value = '';
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <form onSubmit={submitPost}>
        <textarea
          id="post-content"
          name="postContent"
          placeholder="무슨 생각을 하고 계신가요?"
          className="w-full p-2 border rounded"
        />
        <button id="post-submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          게시
        </button>
      </form>
    </div>
  );
};
