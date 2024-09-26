import { LOGIN, LOGOUT, SET_USER } from "./actions";

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...state.user, username: action.payload }));
      return { ...state, isLoggedIn: true, user: { ...state.user, username: action.payload } };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isLoggedIn: false, user: { username: "", email: "", bio: "" } };
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default reducer;
