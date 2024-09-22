export default function AddPost() {
  const AddPost = document.createElement("div");
  AddPost.className = "mb-4 bg-white rounded-lg shadow p-4";

  const ContentTextarea = document.createElement("textarea");
  ContentTextarea.className = "w-full p-2 border rounded";
  ContentTextarea.placeholder = "무슨 생각을 하고 계신가요?";

  const PostBtn = document.createElement("button");
  PostBtn.textContent = "게시";
  PostBtn.className = "mt-2 bg-blue-600 text-white px-4 py-2 rounded";

  AddPost.appendChild(ContentTextarea);
  AddPost.appendChild(PostBtn);

  return AddPost;
}
