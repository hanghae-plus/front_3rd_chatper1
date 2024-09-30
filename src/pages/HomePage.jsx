/** @jsx createVNode */
import { createVNode } from "../lib";
import { Footer, Header, Navigation, Post, PostForm } from "../components";

export const HomePage = () => {
    return (
        <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                {Header()}
                {Navigation()}
                <main class="p-4">
                    {PostForm()}
                    <div id="posts-container" class="space-y-4">
                        {/* {posts.map(Post)} */}
                    </div>
                </main>
                {Footer()}
            </div>
        </div>
    );
};
