/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Header = () =>
  createVNode(
    "header",
    { className: "bg-blue-600 text-white p-4 sticky top-0" },
    [createVNode("h1", { className: "text-2xl font-bold" }, "항해플러스")]
  );
