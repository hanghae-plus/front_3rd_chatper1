const handleLinkClick = (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    navigate(href);
  }
};

const handleTabClick = () => {
  const tabs = document.querySelectorAll("a.tab");
  tabs.forEach((tab) => {
    tab.classList.remove("text-blue-600");
    tab.classList.remove("font-bold");
    tab.classList.add("text-gray-600");
  });
  const currentTab = window.location.pathname;
  const tab = document.querySelector(`a[href="${currentTab}"]`);
  if (!tab) return;
  tab.classList.remove("text-gray-600");
  tab.classList.add("text-blue-600");
  tab.classList.add("font-bold");
};

const handleLogin = () => {
  const username = document.querySelector("#username").value;
  if (!username) return alert("아이디를 입력해주세요.");
  localStorage.setItem(
    "user",
    JSON.stringify({ username, email: "", bio: "" })
  );
  navigate("/profile");
};

const handleLogout = (event) => {
  if (event.target.tagName === "A" && event.target.id === "logout") {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }
};

export { handleLinkClick, handleTabClick, handleLogin, handleLogout };
