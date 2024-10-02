/** @jsx createVNode */
import { createVNode } from './lib';

export const App = ({ targetPage }) => {
  const Page = targetPage;
  return <Page />;
};
