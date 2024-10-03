/** @jsx createVNode */
/** @jsxFrag Fragment */
import { ErrorBoundary } from './components/ErrorBoundary';
import { createVNode, Fragment } from './lib';
import { NotFoundPage } from './pages';
import { globalStore } from './stores';

export const App = ({ targetPage }) => {
  const Page = targetPage || NotFoundPage;
  const error = globalStore.getState().error;

  return (
    <>
      <Page />
      {error && <ErrorBoundary message={error.message} />}
    </>
  );
};
