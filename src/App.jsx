/** @jsx createVNode */
import { createVNode } from './lib';
import { NotFoundPage } from "./pages";
import { globalStore } from './stores';

export const App = ({ targetPage }) => {
  const PageComponent = targetPage ?? NotFoundPage;
  const error = globalStore.getState().error;

  return (
    <div>
      {!error ? PageComponent() : `<h2>오류 발생!</h2><p>의도적인 오류입니다.</p>`}
    </div>
  );
};
