import { logout } from "../localStorage/user";
import { navigate } from "../utils/navigate";

export const attachNavEvent = () => {
  const logoutButton = document.getElementById("logout");
  if (!logoutButton) return;
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  });
};
