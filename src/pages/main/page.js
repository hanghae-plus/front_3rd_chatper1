import Layout from "../../components/Layout";
import AddPost from "./AddPost";
import PostList from "./PostList";

export default function MainPage() {
  const MainPage = document.createElement("div");
  MainPage.appendChild(AddPost());
  MainPage.appendChild(PostList());

  return Layout(MainPage);
}
