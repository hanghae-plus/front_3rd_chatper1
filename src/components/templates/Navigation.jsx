/** @jsx createVNode */
import { createVNode } from "../../lib";

const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Navigation = ({ loggedIn }) =>
  createVNode("nav", { className: "bg-white shadow-md p-2 sticky top-14" }, [
    createVNode("ul", { className: "flex justify-around" }, [
      createVNode(
        "li",
        null,
        createVNode(
          "a",
          { href: "/", className: getNavItemClass("/"), "data-link": true },
          "홈"
        )
      ),
      !loggedIn
        ? createVNode(
            "li",
            null,
            createVNode(
              "a",
              {
                href: "/login",
                className: getNavItemClass("/login"),
                "data-link": true
              },
              "로그인"
            )
          )
        : "",
      loggedIn
        ? createVNode(
            "li",
            null,
            createVNode(
              "a",
              {
                href: "/profile",
                className: getNavItemClass("/profile"),
                "data-link": true
              },
              "프로필"
            )
          )
        : "",
      loggedIn
        ? createVNode(
            "li",
            null,
            createVNode(
              "a",
              { href: "#", id: "logout", className: "text-gray-600" },
              "로그아웃"
            )
          )
        : ""
    ])
  ]);
