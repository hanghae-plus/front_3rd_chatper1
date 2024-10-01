/** @jsx createVNode */
import{ createVNode } from "../lib";

import { Footer, Header, Post, PostForm } from "../components";
import { globalStore } from "../stores";
import { addEvent } from "../utils";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  
  // it('자식 배열을 평탄화해야 한다', () => {
  //   const vNode = createVNode('div', null, ['Hello', ['world', '!']]);
  //   expect(vNode.children).toEqual(['Hello', 'world', '!']);
  const testNode = createVNode('div', null, ['Hello', ['world', '!']]);

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ loggedIn })}
        
        <main class="p-4">
          ${loggedIn ? PostForm() : ''}
          <div id="posts-container" class="space-y-4">
            ${posts.map(Post).join('')}
          </div>
        </main>
        
        ${Footer()}
      </div>
    </div>
  `;
}

const addPost = (content) => {
  const { currentUser, posts } = globalStore.getState();
  globalStore.setState({
    posts: [
      ...posts,
      {
        id: Date.now(),
        author: currentUser.name,
        time: '방금 전',
        content: content
      }
    ]
  })
}

addEvent('click', '#post-submit', () => {
  const content = document.getElementById('post-content').value;
  addPost(content);
});

