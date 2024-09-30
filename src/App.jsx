/** @jsx createVNode */
import { createVNode } from "./lib";

import { RootLayout } from "@/components";

export function App(props) {
  const { targetPage } = props || {};
  return <RootLayout>{targetPage()}</RootLayout>;
}
