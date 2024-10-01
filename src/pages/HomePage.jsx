/** @jsx createVNode */
import { Footer, Post, Navigation, Header, PostForm } from "../components"
import { createVNode } from "../lib"
import { globalStore } from "../stores"

export const HomePage = () => {
  const { posts, loggedIn } = globalStore.getState()

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4">
          <div id="posts-container" class="space-y-4">
            {loggedIn && <PostForm />}
            {posts.map(({ author, time, content, id }) => (
              <Post author={author} time={time} content={content} id={id} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
