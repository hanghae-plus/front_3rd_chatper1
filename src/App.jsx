/** @jsx createVNode */
import { createVNode } from "./lib";

import { RootLayout } from "@/components";
import { globalStore } from "./stores";
import { ErrorPage } from "./pages";

export function App(props) {
  const { targetPage } = props || {};
  const { error } = globalStore.getState();

  return <RootLayout>{!error ? targetPage() : <ErrorPage />}</RootLayout>;
}
