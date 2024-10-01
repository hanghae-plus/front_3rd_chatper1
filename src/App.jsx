/** @jsx createVNode */
import { createVNode } from '@/lib';
import { ErrorBoundary } from '@/components/templates/ErrorBoundary';
import { globalStore } from '@/stores';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
