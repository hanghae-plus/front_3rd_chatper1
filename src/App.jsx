/** @jsx createVNode */
import { createVNode } from './lib';
import { globalStore } from './stores';
import { NotFoundPage } from './pages';
import { ErrorBoundary } from './components/templates/ErrorBoundary';

export const App = ({ props: { targetPage } }) => {
  const PageComponent = targetPage ?? NotFoundPage;

  return [<PageComponent />, <ErrorBoundary />];
};
