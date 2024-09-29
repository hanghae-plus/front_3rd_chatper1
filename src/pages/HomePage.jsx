/** @jsx createVNode */
import { createVNode } from '../lib';
import Header from '../components/templates/Header';
import Navigation from '../components/templates/Navigation';
import Footer from '../components/templates/Footer';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return `
      <div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="max-w-md w-full">
          ${Header()}
          ${Navigation({ loggedIn })}
  
          <main className="p-4">
            ${loggedIn ? PostForm() : ''}
            <div id="posts-container" className="space-y-4">
              ${posts.map(Post).join('')}
            </div>
          </main>
  
          ${Footer()}
        </div>
      </div>
    `;
};
