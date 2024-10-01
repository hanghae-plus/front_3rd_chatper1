/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Footer = () =>
  createVNode("footer", { className: "bg-gray-200 p-4 text-center" }, [
    createVNode("p", null, "© 2024 항해플러스. All rights reserved.")
  ]);
