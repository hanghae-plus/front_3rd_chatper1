/** @jsx createVNode */
import { createVNode } from './lib';

export const App = (props) => {
  console.log('App props', props);
  return props.children;
};
