import Router from "./router";
import { userStore } from "./store/userStore";

export const RootElement = document.getElementById("root");
export const { useNavigate, init } = Router();
export const { getUser, setUser, deleteUser } = userStore();

init();
