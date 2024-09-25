import Layout from "@/components/Layout";
import AddPost from "./AddPost";
import PostList from "./PostList";

import { appendChild, createElement } from "@/utils";

export default function MainPage() {
  const MainPage = createElement({ tagName: "div" });
  appendChild({ parent: MainPage, children: [AddPost(), PostList()] });
  return Layout(MainPage);
}
