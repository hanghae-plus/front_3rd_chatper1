/** @jsx createVNode */
import { Post } from '@components/posts/Post'
import { MainLayout } from '@components/templates'
import { createVNode } from '@lib'
import { globalStore } from '@stores'
import { PostForm } from '@components/posts/PostForm'

export function HomePage() {
  const { posts, loggedIn } = globalStore.getState()
  return (
    <MainLayout>
      <main class="p-4">
        {loggedIn && <PostForm />}
        <div id="posts-container" class="space-y-4">
          {posts.map((props) => (
            <Post {...props} />
          ))}
        </div>
      </main>
    </MainLayout>
  )
}
