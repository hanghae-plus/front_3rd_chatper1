export const home = () => {
  const getHTML = async () => {
    const main = document.createElement("main");
    main.setAttribute("class", "p-4");

    const writeContainer = document.createElement("div");
    writeContainer.setAttribute("class", "mb-4 bg-white rounded-lg shadow p-4");

    const textArea = document.createElement("textarea");
    textArea.setAttribute("class", "w-full p-2 border rounded");
    textArea.setAttribute("placeholder", "무슨 생각을 하고 계신가요?");
    const sendButton = document.createElement("button");
    sendButton.setAttribute(
      "class",
      "mt-2 bg-blue-600 text-white px-4 py-2 rounded"
    );
    sendButton.textContent = "게시";
    writeContainer.appendChild(textArea);
    writeContainer.appendChild(sendButton);
    main.appendChild(writeContainer);

    const feedContainer = document.createElement("div");
    feedContainer.setAttribute("class", "space-y-4");

    const feed = document.createElement("div");
    feed.setAttribute("class", "bg-white rounded-lg shadow p-4");

    const feedHeader = document.createElement("div");
    feedHeader.setAttribute("class", "flex items-center mb-2");

    const feedImage = document.createElement("img");
    feedImage.setAttribute("class", "rounded-full mr-2");
    feedImage.setAttribute("src", "https://via.placeholder.com/40");
    feedImage.setAttribute("alt", "프로필");

    const userInfo = document.createElement("div");
    const userName = document.createElement("p");
    userName.setAttribute("class", "font-bold");
    userName.textContent = "홍길동";
    const submitTime = document.createElement("p");
    submitTime.setAttribute("class", "text-sm text-gray-500");
    userName.textContent = "5분 전";
    userInfo.appendChild(userName);
    userInfo.appendChild(submitTime);
    feedHeader.appendChild(feedImage);
    feedHeader.appendChild(userInfo);
    feed.appendChild(feedHeader);

    const content = document.createElement("p");
    content.textContent = "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!";
    feed.appendChild(content);

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute(
      "class",
      "mt-2 flex justify-between text-gray-500"
    );

    const likeButton = document.createElement("button");
    likeButton.textContent = "좋아요";
    const commentButton = document.createElement("button");
    commentButton.textContent = "댓글";
    const communityButton = document.createElement("button");
    communityButton.textContent = "공유";
    buttonContainer.appendChild(likeButton);
    buttonContainer.appendChild(commentButton);
    buttonContainer.appendChild(communityButton);
    feed.appendChild(buttonContainer);

    feedContainer.appendChild(feed);

    main.appendChild(feedContainer);

    return main;
  };

  return {
    getHTML,
  };
};
