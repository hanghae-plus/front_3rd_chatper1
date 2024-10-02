/** @jsx createVNode */
import { createVNode } from "./lib";
import { globalStore } from "./stores";
import { NotFoundPage } from "./pages";

export const App = ({ targetPage }) => {
  const AppComponent = targetPage ?? NotFoundPage;
  const error = globalStore.getState().error;

  return (
    <div>
      <AppComponent />
      {error ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
          <p
            id="error-boundary"
            class="font-bold p-10 text-red-600"
            role="alert"
          >
            오류 발생! ${error.message || "알 수 없는 오류가 발생했습니다."}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
