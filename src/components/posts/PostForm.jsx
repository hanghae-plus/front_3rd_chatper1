/** @jsx createVNode */
import { createVNode } from "../../lib";
import { globalStore } from "../../stores";

export const PostForm = () => {
  const addPost = (content) => {
    const { currentUser, posts } = globalStore.getState();
    globalStore.setState({
      posts: [
        ...posts,
        {
          id: Date.now(),
          author: currentUser.name,
          time: "방금 전",
          content: content,
        },
      ],
    });
  };

  const handleClick = (e) => {
    const content = document.getElementById("post-content").value;
    addPost(content);
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        id="post-content"
        placeholder="무슨 생각을 하고 계신가요?"
        className="w-full p-2 border rounded"
      ></textarea>
      <button
        id="post-submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleClick}
      >
        게시
      </button>
    </div>
  );
};
