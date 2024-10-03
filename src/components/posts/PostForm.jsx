/** @jsx createVNode */
import { createVNode } from "../../lib";
// import { userStorage } from "../../lib/storage";

export const PostForm = () => {
    const postSubmitHandler = () => {
        const content = document.querySelector("#post-content").value;
        if (!content) {
          alert("내용을 입력해주세요.");
          return;
        }
        // const {userName} = userStorage.get('user');

        const post = {
          id: Date.now(),
          content,
          date: new Date().toISOString(),
          // author: userName,
        };
        const posts = globalStore.getState().posts;
        globalStore.setState({ posts: [post, ...posts] });
        document.querySelector("#post-content").value = "";
      };

  return (
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        id="post-content"
        placeholder="무슨 생각을 하고 계신가요?"
        class="w-full p-2 border rounded"
      ></textarea>
      <button
        id="post-submit"
        class="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={postSubmitHandler}
      >
        게시
      </button>
    </div>
  );
};
