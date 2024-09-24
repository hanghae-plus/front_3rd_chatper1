export const loginStatus = () => {
  const loginStatus = {
    isLogin: false,
    userInfo: null,
  }

  const getIsLogin = () => loginStatus.isLogin

  const getUserInfo = () => loginStatus.userInfo

  const setUserInfo = (newUserInfo) => {
    loginStatus.userInfo = { ...newUserInfo }
    localStorage.setItem("user", JSON.stringify(newUserInfo))
  }

  const login = (userInfo) => {
    loginStatus.isLogin = true
    loginStatus.userInfo = { ...userInfo }
    localStorage.setItem("user", JSON.stringify(userInfo))
  }

  const logout = () => {
    localStorage.removeItem("user")
    loginStatus.isLogin = false
    loginStatus.userInfo = null
  }

  return { getIsLogin, getUserInfo, setUserInfo, login, logout }
}

export default loginStatus
