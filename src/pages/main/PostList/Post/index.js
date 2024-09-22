export default function Post({ userName, postedTime, content }) {
  const PostContainer = document.createElement("div");
  PostContainer.className = "bg-white rounded-lg shadow p-4";

  const UserProfile = document.createElement("div");
  UserProfile.className = "flex items-center mb-2";

  const UserImg = document.createElement("img");
  UserImg.src = "https://via.placeholder.com/40";
  UserImg.alt = "프로필";
  UserImg.className = "rounded-full mr-2";

  const UserInfoContainer = document.createElement("div");
  const UserName = document.createElement("p");
  UserName.className = "font-bold";
  UserName.textContent = userName;

  const PostedTime = document.createElement("p");
  PostedTime.className = "text-sm text-gray-500";
  PostedTime.textContent = postedTime;

  UserInfoContainer.appendChild(UserName);
  UserInfoContainer.appendChild(PostedTime);

  UserProfile.appendChild(UserImg);
  UserProfile.appendChild(UserInfoContainer);

  const Content = document.createElement("p");
  Content.textContent = content;

  const PostBtnContainer = document.createElement("div");
  ["좋아요", "댓글", "공유"].forEach((btnText) => {
    const PostBtn = document.createElement("button");
    PostBtn.textContent = btnText;
    PostBtnContainer.appendChild(PostBtn);
  });

  PostContainer.appendChild(UserInfoContainer);
  PostContainer.appendChild(Content);

  return PostContainer;
}
