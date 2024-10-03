/** @jsx createVNode */
import{ createVNode } from "../lib";
import{ globalStore } from "../stores"
import { Header, Footer, Navigation } from "../components/templates";
import { Post } from "../components/posts/Post";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return(
    <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <Header/>
          <Navigation loggedIn={loggedIn} />
          
          <main class="p-4">
            {loggedIn ? <NotFoundPage/> : ''}
            <div id="posts-container" class="space-y-4">
              {posts.map((post) => (
                <Post {...post} />
              ))}
            </div>
          </main>
          
          <Footer/>
        </div>
      </div>
  );
};
