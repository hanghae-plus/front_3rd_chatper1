import { createElement, appendChild } from "@/utils";

export default function AddPost() {
  const AddPost = createElement({
    tagName: "div",
    className: "mb-4 bg-white rounded-lg shadow p-4",
  });

  const ContentTextarea = createElement({
    tagName: "textarea",
    className: "w-full p-2 border rounded",
    setAttribute: { placeholder: "무슨 생각을 하고 계신가요?" },
  });

  const PostBtn = createElement({
    tagName: "button",
    className: "mt-2 bg-blue-600 text-white px-4 py-2 rounded",
    textContent: "게시",
  });

  appendChild({ parent: AddPost, children: [ContentTextarea, PostBtn] });

  return AddPost;
}
