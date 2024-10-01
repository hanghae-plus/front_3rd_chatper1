/** @jsx createVNode */
import {createVNode} from "../lib";
import {Header, Post, PostForm} from "../components/index.js";
import {Navigation} from "../components/index.js";
import {NotFoundPage} from "./NotFoundPage.jsx";
import {ProfilePage} from "./ProfilePage.jsx";
import {Footer} from "../components/index.js";
import {globalStore} from "../stores";

export const HomePage = () => {
    const {loggedIn, posts} = globalStore.getState();
    return (<div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="max-w-md w-full">
            <Header/>
            <Navigation loggedIn={loggedIn}/>

            <main className="p-4">
                {loggedIn ? <PostForm /> : null}
                <div id="posts-container" className="space-y-4">
                    {posts.map((post)=> <Post {...post}/>)}
                </div>
            </main>

            <Footer />
        </div>
    </div>);
}