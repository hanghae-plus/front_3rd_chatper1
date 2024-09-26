import Router from './Router.js';
import UserData from './stores/UserData.js';
import ErrorHandler from './ErrorHandler.js';

const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
  UserData.setUserData({
    isLogin: true,
    user: storedUser,
  });
}

window.addEventListener('error', (error) => {
  ErrorHandler.showErrorMessage(error.message);
});

Router.initRouter();
