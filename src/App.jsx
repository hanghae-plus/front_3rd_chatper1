/** @jsx createVNode */
import { createVNode } from '@/lib';
import { NotFoundPage } from '@/pages';

export const App = ({ targetPage }) => {
  if (!targetPage) {
    return createVNode('div', null, <NotFoundPage />);
  }

  return createVNode('div', null, [targetPage()]);
};
