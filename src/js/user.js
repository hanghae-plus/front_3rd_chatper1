import router from "../router";

class User {
  constructor(username, email = "", bio = "") {
    this.username = username;
    this.email = email;
    this.bio = bio;
  }

  static getUser() {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      return new User(parsedUser.username, parsedUser.email, parsedUser.bio);
    }
    return null;
  }

  login(username, email = "", bio = "") {
    const user = {
      username,
      email,
      bio,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem("user");
  }

  updateProfile(newUsername, newEmail, newBio) {
    this.username = newUsername || this.username;
    this.email = newEmail || this.email;
    this.bio = newBio || this.bio;

    const updatedUser = {
      username: this.username,
      email: this.email,
      bio: this.bio,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
}

export default User;
