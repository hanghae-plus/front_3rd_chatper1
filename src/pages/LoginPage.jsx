/** @jsx createVNode */
import { createVNode } from "../lib";
import { userStorage } from "../storages";
import { login } from "../main";

export const LoginPage = () =>
  createVNode(
    "div",
    { className: "bg-gray-100 flex items-center justify-center min-h-screen " },
    [
      createVNode(
        "div",
        { className: "bg-white p-8 rounded-lg shadow-md w-full max-w-md" },
        [
          createVNode(
            "h1",
            { className: "text-2xl font-bold text-center text-blue-600 mb-8" },
            "항해플러스"
          ),
          createVNode(
            "form",
            {
              id: "login-form",
              onSubmit: (e) => {
                e.preventDefault();

                const username = document.getElementById("username");
                login({
                  username: username.value,
                  email: "",
                  bio: ""
                });
              }
            },
            [
              createVNode("input", {
                type: "text",
                id: "username",
                placeholder: "사용자 이름",
                className: "w-full p-2 mb-4 border rounded",
                required: true
              }),
              createVNode("input", {
                type: "password",
                placeholder: "비밀번호",
                className: "w-full p-2 mb-6 border rounded",
                required: true
              }),
              createVNode(
                "button",
                {
                  id: "test",
                  type: "submit",
                  className: "w-full bg-blue-600 text-white p-2 rounded"
                },
                "로그인"
              )
            ]
          ),
          createVNode("div", { className: "mt-4 text-center" }, [
            createVNode(
              "a",
              { href: "#", className: "text-blue-600 text-sm" },
              "비밀번호를 잊으셨나요?"
            )
          ]),
          createVNode("hr", { className: "my-6" }),
          createVNode("div", { className: "text-center" }, [
            createVNode(
              "button",
              { className: "bg-green-500 text-white px-4 py-2 rounded" },
              "새 계정 만들기"
            )
          ])
        ]
      )
    ]
  );
