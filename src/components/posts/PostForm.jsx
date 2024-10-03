/** @jsx createVNode */
import { createVNode } from "../../lib";
import { userStorage } from "../../storages";
import { globalStore } from "../../stores";

export const PostForm = () => {
    const postSubmitHandler = () => {
        const content = document.querySelector("#post-content").value;
        const {userName} = userStorage.get('user');
        const posts = globalStore.getState().posts;

        if (!content) {
          alert("내용을 입력해주세요.");
          return;
        }
        const post = {
          id: posts.length + 1,
          content: content,
          date: new Date().toISOString(),
          author: userName,
        };

        globalStore.setState({ posts: [post, ...posts] });
        document.querySelector("#post-content").value = "";
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
        onClick={postSubmitHandler}
      >
        게시
      </button>
    </div>
  );
};
