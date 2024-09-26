import { login, logout, setUser } from "./actions";
import reducer from "./reducer";
import createStore from "./store";

const parsedUser = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoggedIn: !!parsedUser?.username,
  user: {
    username: parsedUser?.username || "",
    email: parsedUser?.email || "",
    bio: parsedUser?.bio || ""
  }
};

const store = createStore(reducer, initialState);
const { dispatch, subscribe, getState } = store;

const selectIsLoggedIn = () => getState().isLoggedIn;
const selectUser = () => getState().user;

export { dispatch, subscribe, setUser, login, logout, getState, selectIsLoggedIn, selectUser };
