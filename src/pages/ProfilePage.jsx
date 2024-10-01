/** @jsx createVNode */
import { Footer } from "../components/templates/Footer";
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import { createVNode } from "../lib";
import { updateProfile } from "../main";
import { globalStore } from "../stores";

export const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username = "", email = "", bio = "" } = currentUser ?? {};
  return createVNode(
    "div",
    { className: "bg-gray-100 min-h-screen flex justify-center" },
    [
      createVNode("div", { className: "max-w-md w-full" }, [
        Header(),
        Navigation({ loggedIn }),
        createVNode("main", { className: "p-4" }, [
          createVNode(
            "div",
            { className: "bg-white p-8 rounded-lg shadow-md" },
            [
              createVNode(
                "h2",
                {
                  className: "text-2xl font-bold text-center text-blue-600 mb-8"
                },
                "내 프로필"
              ),
              createVNode(
                "form",
                {
                  id: "profile-form",
                  onSubmit: (e) => {
                    e.preventDefault();

                    const username = document.getElementById("username");
                    const email = document.getElementById("email");
                    const bio = document.getElementById("bio");
                    updateProfile({
                      username: username.value || "",
                      email: email.value || "",
                      bio: bio.value || ""
                    });
                  }
                },
                [
                  createVNode("div", { className: "mb-4" }, [
                    createVNode(
                      "label",
                      {
                        for: "username",
                        className: "block text-gray-700 text-sm font-bold mb-2"
                      },
                      "사용자 이름"
                    ),
                    createVNode("input", {
                      type: "text",
                      id: "username",
                      name: "username",
                      className: "w-full p-2 border rounded",
                      value: username,
                      required: true
                    })
                  ]),
                  createVNode("div", { className: "mb-4" }, [
                    createVNode(
                      "label",
                      {
                        for: "email",
                        className: "block text-gray-700 text-sm font-bold mb-2"
                      },
                      "이메일"
                    ),
                    createVNode("input", {
                      type: "email",
                      id: "email",
                      name: "email",
                      className: "w-full p-2 border rounded",
                      value: email,
                      required: true
                    })
                  ]),
                  createVNode("div", { className: "mb-6" }, [
                    createVNode(
                      "label",
                      {
                        for: "bio",
                        className: "block text-gray-700 text-sm font-bold mb-2"
                      },
                      "자기소개"
                    ),
                    createVNode(
                      "textarea",
                      {
                        id: "bio",
                        name: "bio",
                        rows: "4",
                        className: "w-full p-2 border rounded"
                      },
                      bio
                    )
                  ]),
                  createVNode(
                    "button",
                    {
                      type: "submit",
                      className:
                        "w-full bg-blue-600 text-white p-2 rounded font-bold"
                    },
                    "프로필 업데이트"
                  )
                ]
              )
            ]
          )
        ]),
        Footer()
      ])
    ]
  );
};
