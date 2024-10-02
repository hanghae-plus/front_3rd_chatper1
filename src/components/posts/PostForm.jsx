/** @jsx createVNode */
import { createFormData, createVNode } from '../../lib';

export const PostForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = createFormData(e.target);
    onSubmit(formData);
    e.target.reset();
  };

  return (
    <form id="post-form" className="mb-4 bg-white rounded-lg shadow p-4" onSubmit={handleSubmit}>
      <textarea
        id="post-content"
        name="content"
        placeholder="무슨 생각을 하고 계신가요?"
        className="w-full p-2 border rounded"
      ></textarea>
      <button id="post-submit" type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        게시
      </button>
    </form>
  );
};
