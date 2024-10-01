/** @jsx createVNode */
import { createVNode } from "./lib";
import { NotFoundPage } from "./pages";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
  const PageComponent = targetPage ?? NotFoundPage;
  const error = globalStore.getState().error;

  return createVNode("div", null, [
    PageComponent(),
    error
      ? createVNode(
          "div",
          {
            id: "error-boundary",
            className:
              "fixed bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-75",
            role: "alert"
          },
          [
            createVNode(
              "div",
              { className: "flex justify-between items-center" },
              [
                createVNode("div", null, [
                  createVNode(
                    "strong",
                    { className: "font-bold" },
                    "오류 발생!"
                  ),
                  createVNode(
                    "span",
                    { className: "block sm:inline ml-1" },
                    error.message || "알 수 없는 오류가 발생했습니다."
                  )
                ]),
                createVNode(
                  "button",
                  {
                    className: "text-red-700 hover:text-red-900 font-semibold"
                  },
                  "×"
                )
              ]
            )
          ]
        )
      : ""
  ]);
};
