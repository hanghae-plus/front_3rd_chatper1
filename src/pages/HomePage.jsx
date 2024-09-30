/** @jsx createVNode */
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import { Footer } from '../components/templates/Footer';
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { ProfilePage } from "./ProfilePage";
import { NotFoundPage } from "./NotFoundPage";
import { Post } from "../components/posts/Post";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        {Header()}
        {Navigation({ loggedIn })}
        
        <main className="p-4">
          <div id="posts-container" className="space-y-4">
            {posts.map(post => (
              <Post
                key={post.id}
                author={post.author}
                time={post.time}
                content={post.content}
                id={post.id}
              />
            ))}
          </div>
        </main>
        
        {Footer()}
      </div>
    </div>
  );
};
