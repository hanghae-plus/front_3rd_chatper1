/** @jsx createVNode */
import{ createVNode } from "../lib";
import { globalStore } from '../stores';
import { Navigation } from '../components/templates/Navigation';
import { PostForm } from "../components";
import { Post } from "../components";

export const HomePage = () => { 
  const { loggedIn, posts } = globalStore.getState(); 
  return (            
      <div className="bg-gray-100 min-h-screen flex justify-center"> 
        <div className="max-w-md w-full"> 
          {<Navigation loggedIn={loggedIn}/>} 
          <main className="p-4"> 
          {loggedIn ? <PostForm loggedIn={loggedIn}/>:''} 
          </main> 
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
        </div> 
      </div> 
  ); 
};
