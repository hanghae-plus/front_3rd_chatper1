export const Profile = () => {
  const getHTML = async () => {
    const main = document.createElement("main");
    main.setAttribute("class", "p-4");

    // 프로필 컨테이너 생성
    const profileContainer = document.createElement("div");
    profileContainer.setAttribute("class", "bg-white p-8 rounded-lg shadow-md");

    // 제목 생성
    const title = document.createElement("h2");
    title.setAttribute(
      "class",
      "text-2xl font-bold text-center text-blue-600 mb-8"
    );
    title.textContent = "내 프로필";

    // 폼 생성
    const form = document.createElement("form");

    // 사용자 이름 필드 생성
    const usernameField = document.createElement("div");
    usernameField.setAttribute("class", "mb-4");

    const usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.setAttribute(
      "class",
      "block text-gray-700 text-sm font-bold mb-2"
    );
    usernameLabel.textContent = "사용자 이름";

    const usernameInput = document.createElement("input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("id", "username");
    usernameInput.setAttribute("name", "username");
    usernameInput.setAttribute("value", "홍길동");
    usernameInput.setAttribute("class", "w-full p-2 border rounded");

    usernameField.appendChild(usernameLabel);
    usernameField.appendChild(usernameInput);

    // 이메일 필드 생성
    const emailField = document.createElement("div");
    emailField.setAttribute("class", "mb-4");

    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.setAttribute(
      "class",
      "block text-gray-700 text-sm font-bold mb-2"
    );
    emailLabel.textContent = "이메일";

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "email");
    emailInput.setAttribute("name", "email");
    emailInput.setAttribute("value", "hong@example.com");
    emailInput.setAttribute("class", "w-full p-2 border rounded");

    emailField.appendChild(emailLabel);
    emailField.appendChild(emailInput);

    // 자기소개 필드 생성
    const bioField = document.createElement("div");
    bioField.setAttribute("class", "mb-6");

    const bioLabel = document.createElement("label");
    bioLabel.setAttribute("for", "bio");
    bioLabel.setAttribute(
      "class",
      "block text-gray-700 text-sm font-bold mb-2"
    );
    bioLabel.textContent = "자기소개";

    const bioTextarea = document.createElement("textarea");
    bioTextarea.setAttribute("id", "bio");
    bioTextarea.setAttribute("name", "bio");
    bioTextarea.setAttribute("rows", "4");
    bioTextarea.setAttribute("class", "w-full p-2 border rounded");
    bioTextarea.textContent =
      "안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.";

    bioField.appendChild(bioLabel);
    bioField.appendChild(bioTextarea);

    // 버튼 생성
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute(
      "class",
      "w-full bg-blue-600 text-white p-2 rounded font-bold"
    );
    submitButton.textContent = "프로필 업데이트";

    // 각 요소들을 폼과 컨테이너에 추가
    form.appendChild(usernameField);
    form.appendChild(emailField);
    form.appendChild(bioField);
    form.appendChild(submitButton);
    profileContainer.appendChild(title);
    profileContainer.appendChild(form);

    // main 요소에 프로필 컨테이너 추가
    main.appendChild(profileContainer);

    return main;
  };
  return { getHTML };
};
