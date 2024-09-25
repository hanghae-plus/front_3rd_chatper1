const User = () => {
  let user = {};
  function getUser() {
    user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  function setUser(updatedUser) {
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  function deleteUser() {
    localStorage.removeItem('user');
  }
  return {
    getUser,
    setUser,
    deleteUser,
  };
};

export default User;
