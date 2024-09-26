import { useUserStore } from './util/useUseStore'

const STORAGE_KEYS = ['username', 'email', 'bio']

const UserInfo = (() => {
  let user = useUserStore.getItem('user') || {
    username: '',
    email: '',
    bio: '',
  }

  const save = () => {
    useUserStore.setItem('user', user)
  }

  return {
    get(key) {
      if (!STORAGE_KEYS.includes(key)) {
        return undefined
      }
      return user[key]
    },
    set(key, value) {
      if (!STORAGE_KEYS.includes(key)) {
        return
      }
      user[key] = value
      save()
    },
    clear() {
      user = { username: '', email: '', bio: '' }
      useUserStore.removeItem('user')
    },
  }
})()

export default UserInfo
