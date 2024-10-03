/** @jsx createVNode */
import { createVNode } from "./lib";
import { NotFoundPage } from "./pages";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
  const { error } = globalStore.getState();

  if (!targetPage) {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <div>
        <h1>오류 발생!</h1>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return targetPage();
};
