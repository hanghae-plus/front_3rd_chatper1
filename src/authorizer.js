export default class Authorizer {
  isAuth() {
    return localStorage.getItem('user') !== null;
  }
}