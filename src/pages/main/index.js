import { DELAY_TIME } from '@constants'
import { debounce, memoize } from '@utils'
import { FeedItem } from '@components/main'
import { MainLayout } from '@components/layouts'
import { UserStore } from '@stores'

let feeds = []
const DATA_URL = '/data.json'
const FEEDS_LIMIT = 10
const USER_PROFILE_URL = 'https://via.placeholder.com/41'
const LOGIN_REQUIRED_MESSAGE = '로그인이 필요합니다.'
const USER = 'user'
const CURRENT_TIME = '지금'
const FIRST_INDEX = 0

export default function mainPage() {
  let page = 1
  let totalCount = 0
  const userStore = new UserStore()

  const memoizedFetchFeeds = memoize(async () => {
    try {
      const response = await fetch(DATA_URL)
      return await response.json()
    } catch (e) {
      console.error(e)
      return []
    }
  })

  async function fetchFeeds(page) {
    const newFeeds = await memoizedFetchFeeds()
    totalCount = newFeeds.length
    feeds = newFeeds.slice(FIRST_INDEX, page * FEEDS_LIMIT)
    const feedsElement = document.getElementById('feeds')
    if (feedsElement) {
      feedsElement.innerHTML = feeds.map((feed) => FeedItem(feed)).join('')
    }
  }

  function handlePostMessage() {
    const message = document.getElementById('message').value
    const user = userStore.getState(USER)

    if (!user) {
      alert(LOGIN_REQUIRED_MESSAGE)
      return
    }

    if (!message.trim()) return

    const newMessage = {
      name: user.username,
      profile: USER_PROFILE_URL,
      content: message,
      time: CURRENT_TIME,
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

  const debounceScroll = debounce(handleScroll, DELAY_TIME.SHORT)

  function render() {
    document.getElementById('root').innerHTML = template
    window.addEventListener('scroll', debounceScroll)
    document.getElementById('message-button').addEventListener('click', handlePostMessage)
    fetchFeeds(page)
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
