/** @jsx createVNode */
import { createVNode } from "./lib";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
  const error = globalStore.getState().error;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      {error ? (
        <p id="error-boundary" class="font-bold p-10 text-red-600" role="alert">
          오류 발생! ${error.message || '알 수 없는 오류가 발생했습니다.'}
        </p>
      ) : (
        targetPage()
      )}
    </div>
  );
};