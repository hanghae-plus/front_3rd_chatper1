/** @jsx createVNode */
import { createVNode } from '../../lib';

export const Footer = () => (
  <footer className='bg-gray-200 p-4 text-center'>
    <p>&copy; {new Date().getFullYear()} 항해플러스. All rights reserved.</p>
  </footer>
);