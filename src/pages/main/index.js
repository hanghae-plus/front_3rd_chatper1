import { MainLayout } from '@components/layouts'
import { FeedItem } from '@components/main'
import { debounce } from '@utils'
import { UserStore } from '@stores'

let feeds = []
let totalCount = 0
const userStore = new UserStore()

export default function mainPage() {
  let page = 1
  const rootElement = document.getElementById('root')
  rootElement.innerHTML = MainLayout(`<main class="p-4">
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea id="message" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
      <button id="message-button" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
    </div>

    <div id="feeds" class="space-y-4"></div>
  </main>`)

  async function fetchFeeds(page) {
    try {
      const response = await fetch('/data.json')
      const data = await response.json()
      totalCount = data.length
      feeds = [...feeds, ...data].slice(0, page * 10)
      document.getElementById('feeds').innerHTML = feeds.map((feed) => FeedItem(feed)).join('')
    } catch (error) {
      console.error(error)
    }
  }

  fetchFeeds(page)

  window.addEventListener(
    'scroll',
    debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (feeds.length >= totalCount) return
        fetchFeeds(++page)
      }
    }, 300)
  )

  // 메세지 등록 (오류가 많을꺼같아서 보류중)
  document.getElementById('message-button').addEventListener('click', (e) => {
    const message = document.getElementById('message').value
    const user = userStore.getState('user')

    if (!user || !user.username) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!message.trim()) return

    const newMessage = {
      name: user.username,
      profile: 'https://via.placeholder.com/40',
      content: message,
      time: '지금',
    }

    feeds = [newMessage, ...feeds]
    document.getElementById('feeds').innerHTML = feeds.map((feed) => FeedItem(feed)).join('')
    document.getElementById('message').value = ''
    document.getElementById('message').focus()
  })
}