import { DATA_URL, FEEDS_LIMIT, MESSAGE, SCROLL_DEBOUNCE_DELAY, USER_PROFILE_URL } from '@constants'
import { debounce } from '@utils'
import { FeedItem } from '@components/main'
import { MainLayout } from '@components/layouts'
import { UserStore } from '@stores'

let feeds = []

export default function mainPage() {
  let page = 1
  let totalCount = 0
  const userStore = new UserStore()

  async function fetchFeeds(page) {
    try {
      const response = await fetch(DATA_URL)
      const data = await response.json()
      totalCount = data.length
      feeds = [...feeds, ...data].slice(0, page * FEEDS_LIMIT)
      document.getElementById('feeds').innerHTML = feeds.map((feed) => FeedItem(feed)).join('')
    } catch (error) {
      console.error(error)
    }
  }

  function handlePostMessage() {
    const message = document.getElementById('message').value
    const user = userStore.getState('user')

    if (!user || !user.username) {
      alert(MESSAGE.LOGIN_REQUIRED)
      return
    }

    if (!message.trim()) return

    const newMessage = {
      name: user.username,
      profile: USER_PROFILE_URL,
      content: message,
      time: '지금',
    }

    feeds = [newMessage, ...feeds]
    document.getElementById('feeds').innerHTML = feeds.map((feed) => FeedItem(feed)).join('')
    document.getElementById('message').value = ''
    document.getElementById('message').focus()
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if (feeds.length >= totalCount) return
      fetchFeeds(++page)
    }
  }

  const template = MainLayout(`<main class="p-4">
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea id="message" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
      <button id="message-button" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
    </div>

    <div id="feeds" class="space-y-4"></div>
  </main>`)

  let debounceScroll = debounce(handleScroll, SCROLL_DEBOUNCE_DELAY)

  function render() {
    document.getElementById('root').innerHTML = template
    fetchFeeds(page)
    window.addEventListener('scroll', debounceScroll)
    document.getElementById('message-button').addEventListener('click', handlePostMessage)
  }

  function cleanup() {
    window.removeEventListener('scroll', debounceScroll)
    document.getElementById('message-button').removeEventListener('click', handlePostMessage)
  }

  return {
    render,
    cleanup,
  }
}
