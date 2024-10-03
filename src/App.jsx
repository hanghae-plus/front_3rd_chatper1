/** @jsx createVNode */
import { createVNode } from '@/lib';
import { ErrorBoundary } from '@/components/templates/ErrorBoundary';
import { globalStore } from '@/stores';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App = ({ targetPage }) => {
  const error = globalStore.getState().error;
  const PageComponent = targetPage ?? NotFoundPage;

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  return <PageComponent />;
};
