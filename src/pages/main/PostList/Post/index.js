import { appendChild, createElement } from "@/utils";

export default function Post({ userName, postedTime, content }) {
  const PostContainer = createElement({
    tagName: "div",
    className: "bg-white rounded-lg shadow p-4",
  });

  const UserProfile = createElement({
    tagName: "div",
    className: "flex items-center mb-2",
  });

  const UserImg = createElement({
    tagName: "img",
    className: "rounded-full mr-2",
    setAttribute: { src: "https://via.placeholder.com/40", alt: "프로필" },
  });

  const UserInfoContainer = createElement({ tagName: "div" });

  const UserName = createElement({
    tagName: "p",
    className: "font-bold",
    textContent: userName,
  });

  const PostedTime = createElement({
    tagName: "p",
    className: "text-sm text-gray-500",
    textContent: postedTime,
  });

  appendChild({ parent: UserInfoContainer, children: [UserName, PostedTime] });
  appendChild({ parent: UserProfile, children: [UserImg, UserInfoContainer] });

  const Content = createElement({ tagName: "p", textContent: content });

  const PostBtnContainer = createElement({
    tagName: "div",
    className: "mt-2 flex justify-between text-gray-500",
  });
  ["좋아요", "댓글", "공유"].forEach((btnText) => {
    const PostBtn = createElement({ tagName: "button", textContent: btnText });
    appendChild({ parent: PostBtnContainer, children: [PostBtn] });
  });

  appendChild({
    parent: PostContainer,
    children: [UserProfile, Content, PostBtnContainer],
  });

  return PostContainer;
}
