export const Header = () => {
  const getHTML = async () => {
    const header = document.createElement("main");
    header.setAttribute(
      "class",
      "bg-gray-100 min-h-screen flex justify-center"
    );

    const headerContainer = document.createElement("div");
    headerContainer.setAttribute("class", "max-w-md w-full");
    header.appendChild(headerContainer);

    const mainHeader = document.createElement("header");
    mainHeader.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

    const title = document.createElement("h1");
    mainHeader.setAttribute("class", "text-2xl font-bold");
    title.textContent = "항해플러스";
    mainHeader.appendChild(title);
    header.appendChild(mainHeader);

    const navigation = document.createElement("nav");
    navigation.setAttribute("class", "bg-white shadow-md p-2 sticky top-14");

    const links = document.createElement("ul");
    navigation.setAttribute("class", "flex justify-around");

    const homeLink = document.createElement("li");
    const homeLinkAnchor = document.createElement("a");
    homeLinkAnchor.setAttribute("class", "text-blue-600");
    homeLinkAnchor.setAttribute("href", "/");
    homeLinkAnchor.textContent = "홈";
    homeLink.appendChild(homeLinkAnchor);
    links.appendChild(homeLink);

    const profileLink = document.createElement("li");
    const profileLinkAnchor = document.createElement("a");
    profileLinkAnchor.setAttribute("class", "text-gray-600");
    profileLinkAnchor.setAttribute("href", "/profile");
    profileLinkAnchor.textContent = "프로필";
    profileLink.appendChild(profileLinkAnchor);
    links.appendChild(profileLink);

    const logoutLink = document.createElement("li");
    const logoutLinkAnchor = document.createElement("a");
    logoutLinkAnchor.setAttribute("class", "text-gray-600");
    profileLinkAnchor.setAttribute("href", "#");
    logoutLinkAnchor.textContent = "로그아웃";
    logoutLink.appendChild(logoutLinkAnchor);
    links.appendChild(logoutLink);
    navigation.appendChild(links);
    header.appendChild(navigation);

    return header;
  };

  return {
    getHTML,
  };
};
