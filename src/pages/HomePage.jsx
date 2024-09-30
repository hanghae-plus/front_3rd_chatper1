/** @jsx createVNode */
import { Footer, Post } from "../components"
import { Header } from "../components/templates/Header"
import { Navigation } from "../components/templates/Navigation"
import { createVNode } from "../lib"
import { globalStore } from "../stores"

export const HomePage = () => {
  const { posts } = globalStore.getState()

  return (
    <div>
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4">
          <div id="posts-container" class="space-y-4">
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
