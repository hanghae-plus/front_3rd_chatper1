/** @jsx createVNode */
import { Post } from "../components/posts/Post";
import { PostForm } from "../components/posts/PostForm";
import { Footer } from "../components/templates/Footer";
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import { createVNode } from "../lib";
import { globalStore } from "../stores";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return createVNode(
    "div",
    { className: "bg-gray-100 min-h-screen flex justify-center" },
    [
      createVNode("div", { className: "max-w-md w-full" }, [
        Header(),
        Navigation({ loggedIn }),
        createVNode("main", { className: "p-4" }, [
          loggedIn ? PostForm() : null,
          createVNode(
            "div",
            { id: "posts-container", className: "space-y-4" },
            posts.map((post) => Post(post))
          )
        ]),
        Footer()
      ])
    ]
  );
};
