/** @jsx createVNode */
import{ createVNode } from "../lib";
import { globalStore } from '../stores/globalStore';
import { Header } from '../components';
import { Navigation } from '../components';
import { Footer } from '../components';
import { Post } from '../components';
export const HomePage = () => {
    const { loggedIn, posts } = globalStore.getState();
    return (
        // <div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="max-w-md w-full">

            <div className="max-w-md w-full">
                <Header />
                {loggedIn ? NotFoundPage() : ""}
                <Navigation loggedIn={loggedIn} />
                
                <main className="p-4">
                    {loggedIn && <NotFoundPage />}
                    <div id="posts-container" className="space-y-4">
                        {posts.map(Post)}
                        {/* {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))} */}
                    </div>
                </main>
                
                <Footer />
            </div>
         </div>
    );
  }
