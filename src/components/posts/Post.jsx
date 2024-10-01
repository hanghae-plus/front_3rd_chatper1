/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Post = ({ author, time, content, id }) =>
  createVNode("div", { className: "bg-white rounded-lg shadow p-4 mb-4" }, [
    createVNode("div", { className: "flex items-center mb-2" }, [
      createVNode("img", {
        src: "https://via.placeholder.com/40",
        alt: "프로필",
        className: "rounded-full mr-2"
      }),
      createVNode("div", null, [
        createVNode("div", { className: "font-bold" }, author),
        createVNode("div", { className: "text-gray-500 text-sm" }, time)
      ])
    ]),
    createVNode("p", null, content),
    createVNode(
      "div",
      { className: "mt-2 flex justify-between text-gray-500" },
      [
        createVNode(
          "span",
          { className: "like-button", "data-post-id": id },
          "좋아요"
        ),
        createVNode("span", null, "댓글"),
        createVNode("span", null, "공유")
      ]
    )
  ]);
