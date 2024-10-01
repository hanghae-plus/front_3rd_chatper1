/** @jsx createVNode */
import { createVNode } from './lib';
import { NotFoundPage } from './pages';
import { ErrorBoundary } from './components/templates/ErrorBoundary';

export const App = ({ targetPage }) => {
  const PageComponent = targetPage ?? NotFoundPage;

  return [<PageComponent />, <ErrorBoundary />];
};
