import AddPost from "./AddPost";
import PostList from "./PostList";

export default function MainPage() {
  const MainPage = document.createElement("main");
  MainPage.setAttribute("class", "p-4");
  MainPage.appendChild(AddPost());
  MainPage.appendChild(PostList());

  return MainPage;
}
