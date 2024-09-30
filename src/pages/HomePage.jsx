/** @jsx createVNode */
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import { Footer } from '../components/templates/Footer';

import{ createVNode } from "../lib";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {Header()}
        {Navigation({ loggedIn })}
      
        <main class="p-4">
          {loggedIn ? NotFoundPage() : ''}
          <div id="posts-container" class="space-y-4">
            {posts.map(ProfilePage).join('')}
          </div>
        </main>
      
        {Footer()}
      </div>
    </div>
  );
};
