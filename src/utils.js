export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem('user');
}

export function isLogin() {
  return getUser() !== null;
}

// 태스트 해보기
class User {
    #user;

    constructor() {
        this.#user = JSON.parse(localStorage.getItem('user'));
    }
    
    setUser(user) {
        this.#user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }
    getUser() {
        return this.#user;
    }
    isLogin() {
        return this.#user !== null;
    }
}

// export default new User();