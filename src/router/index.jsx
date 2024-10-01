/** @jsx createVNode */
import { createRouter, createVNode } from '../lib';
import { ForbiddenError, UnauthorizedError } from '../errors';
import { globalStore } from '../stores';
import { HomePage, LoginPage, ProfilePage } from '../pages';

export const router = createRouter({
  '/': () => <HomePage />,
  '/login': () => {
    const { loggedIn } = globalStore.getState();
    if (loggedIn) {
      throw new ForbiddenError();
    }
    return <LoginPage />;
  },
  '/profile': () => {
    const { loggedIn } = globalStore.getState();
    if (!loggedIn) {
      throw new UnauthorizedError();
    }
    return <ProfilePage />;
  },
});
