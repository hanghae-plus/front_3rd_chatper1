/** @jsx createVNode */
import { createVNode } from "./lib";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
  const PageComponent = targetPage;
  const error = globalStore.getState().error;
  return (
    <div>
      {error ? (
        <p
          id="error-boundary"
          className="font-bold p-10 text-red-600"
          role="alert"
        >
          오류 발생! [{error.message}]
        </p>
      ) : (
        <PageComponent />
      )}
    </div>
  );
};
