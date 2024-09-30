/** @jsx createVNode */
import{ createVNode } from "../lib";
import { globalStore } from '../stores';
import { Navigation } from '../components/templates/Navigation';
import { Footer, Header, PostForm } from "../components";
import { Post } from "../components";


export const HomePage = ({isComponentShow}) => { 
  const { loggedIn, posts } = globalStore.getState(); 
  return (            
        <div className="max-w-md w-full"> 

            {isComponentShow ? <Header />: ''} 
            {<Navigation loggedIn={loggedIn}/>} 

            <main className="p-4"> 
                {loggedIn ? <PostForm loggedIn={loggedIn}/>:''} 
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

          {isComponentShow ? <Footer/>: ''} 
        </div> 
  ); 
};
