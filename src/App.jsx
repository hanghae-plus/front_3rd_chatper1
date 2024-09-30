/** @jsx createVNode */
import { createVNode } from "./lib";
import React from "react";

export const App = ({ targetPage }) => {
  return <div>{targetPage}</div>;
};
