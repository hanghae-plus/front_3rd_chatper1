/** @jsx createVNode */
import { createVNode } from '../lib';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${ProfilePage()}${NotFoundPage({ loggedIn })}
        <main class="p-4">
          ${loggedIn ? NotFoundPage() : ''}
          <div id="posts-container" class="space-y-4">
            ${posts.map(ProfilePage).join('')}
          </div>
        </main>
        ${HomePage()}
      </div>
    </div>
  );
};
