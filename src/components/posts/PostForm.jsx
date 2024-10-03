/** @jsx createVNode */
import { createVNode } from '../../lib';
import { globalStore } from '../../stores';

export const PostForm = () => {
  const submitPost = () => {
    const contentEl = document.getElementById('post-content');
    const { currentUser, posts } = globalStore.getState();
    const { username } = currentUser;

    const newPost = [
      {
        id: posts.length + 1,
        author: username,
        time: '방금',
        content: contentEl.value,
      },
      ...posts,
    ];
    globalStore.setState({ posts: newPost });
    contentEl.value = '';
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        id="post-content"
        name="post-content"
        placeholder="무슨 생각을 하고 계신가요?"
        className="w-full p-2 border rounded"
      />
      <button id="post-submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" onClick={submitPost}>
        게시
      </button>
    </div>
  );
};
