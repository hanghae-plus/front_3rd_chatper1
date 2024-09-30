/** @jsx createVNode */
import { createVNode } from '@/lib';
import { NotFoundPage } from '@/pages';
import { ErrorBoundary } from './components/templates/ErrorBoundary';
import { globalStore } from './stores';

export const App = ({ targetPage }) => {
  const error = globalStore.getState().error;

  if (error) {
    return (
      <div>
        <ErrorBoundary error={error} />
      </div>
    );
  }

  if (!targetPage) {
    return (
      <div>
        <NotFoundPage />
      </div>
    );
  }

  return <div>{targetPage()}</div>;
};
