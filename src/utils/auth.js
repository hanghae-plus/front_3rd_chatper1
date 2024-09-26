export const isLoggedIn = () => !!localStorage.getItem("user");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const authLogin = (username) => {
  if (!username) {
    alert("아이디를 입력하세요");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ username, email: "", bio: "" })
  );
};

export const authLogout = () => {
  localStorage.removeItem("user");
};

export const updateUser = (user) => {
  const currentUser = getUser();
  const updateUser = { ...currentUser, ...user };
  localStorage.setItem("user", JSON.stringify(updateUser));

  alert("프로필이 업데이트되었습니다.");
};
