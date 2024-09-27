import { getUser, login, logout, updateUser } from '../helpers';
import Store from './store';

class UserStore extends Store {
  get isLogin() {
    return !!this.state.user;
  }

  login(newUser) {
    this.setState({
      user: newUser,
    });

    login(newUser);
  }

  logout() {
    this.setState({
      user: null,
    });

    logout();
  }

  updateUser(newUser) {
    this.setState({
      user: newUser,
    });

    updateUser(newUser);
  }
}

const userStore = new UserStore({
  user: getUser(),
});

export default userStore;
