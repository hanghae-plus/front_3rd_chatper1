/** @jsx createVNode */
import { createVNode } from "../../lib";
import { globalStore } from "../../stores";

export const PostForm = () => {
  const curUser = globalStore.getState().currentUser;
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = document.getElementById("post-content").value;

    if (!content.trim()) {
      alert("게시글 내용을 입력해주세요!");
      return;
    }

    const { posts } = globalStore.getState();

    const newPost = {
      id: posts.length + 1,
      author: curUser.username,
      time: "방금 전",
      content,
    };

    globalStore.setState({
      posts: [newPost, ...posts],
    });

    document.getElementById("post-content").value = "";
  };

  return (
    <div classsName="mb-4 bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          id="post-content"
          placeholder="무슨 생각을 하고 계신가요?"
          classsName="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          classsName="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          게시
        </button>
      </form>
    </div>
  );
};
