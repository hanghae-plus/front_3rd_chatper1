/** @jsx createVNode */
import { createVNode } from '../lib';
import { DefaultLayout } from '../layouts';

export const HomePage = () => {
  return (
    <DefaultLayout>
      <div>hi</div>
    </DefaultLayout>
  );
};
