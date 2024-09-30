/** @jsx createVNode */
import { createVNode } from "./lib";

export const App = ({ targetPage }) => {
  return <div> {targetPage()}</div>;
};
