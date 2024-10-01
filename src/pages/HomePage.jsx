/** @jsx createVNode */
import{ createVNode } from "../lib";
import {Footer, Header, Navigation, Post} from "../components/index.js";
import {NotFoundPage} from "./NotFoundPage.jsx";
import {globalStore} from "../stores/index.js";
import {ProfilePage} from "./ProfilePage.jsx";

export const HomePage = () => {
    const { loggedIn, posts } = globalStore.getState();
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="max-w-md w-full">
                <Header />
                <Navigation />

                <main className="p-4">
                    <div id="posts-container" className="space-y-4">
                        {posts.map(({id, author, time, content}) => (
                            <Post postId={id} author={author} time={time} content={content}/>
                        ))}
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    )
}
