import { logoutHandler } from "./formSubmitHandler";

export const Header = () => {
  const getHeader = () => {
    const header = document.createElement("div");
    // header.setAttribute("class", "max-w-md w-full");

    const mainHeader = document.createElement("header");
    mainHeader.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

    const title = document.createElement("h1");
    title.setAttribute("class", "text-2xl font-bold");
    title.textContent = "항해플러스";
    mainHeader.appendChild(title);
    header.appendChild(mainHeader);

    const navigation = document.createElement("nav");
    navigation.setAttribute("class", "bg-white shadow-md p-2 sticky top-14");

    const links = document.createElement("ul");
    links.setAttribute("class", "flex justify-around");

    const homeLink = document.createElement("li");
    const homeLinkAnchor = document.createElement("a");
    homeLinkAnchor.setAttribute("class", "text-blue-600 home");
    // homeLinkAnchor.setAttribute("href", "/");
    homeLinkAnchor.textContent = "홈";
    homeLink.appendChild(homeLinkAnchor);
    links.appendChild(homeLink);

    const logoutLink = document.createElement("li");
    const logoutLinkAnchor = document.createElement("a");
    logoutLinkAnchor.setAttribute("class", "text-gray-600 login");
    // logoutLinkAnchor.setAttribute("href", "/login");
    logoutLinkAnchor.textContent = "로그인";
    logoutLink.appendChild(logoutLinkAnchor);
    links.appendChild(logoutLink);
    navigation.appendChild(links);
    header.appendChild(navigation);

    return header;
  };

  return {
    getHeader,
  };
};

export const LoginHeader = () => {
  const getLoginHeader = () => {
    const header = document.createElement("div");
    // header.setAttribute("class", "max-w-md w-full");

    const mainHeader = document.createElement("header");
    mainHeader.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

    const title = document.createElement("h1");
    title.setAttribute("class", "text-2xl font-bold");
    title.textContent = "항해플러스";
    mainHeader.appendChild(title);
    header.appendChild(mainHeader);

    const navigation = document.createElement("nav");
    navigation.setAttribute("class", "bg-white shadow-md p-2 sticky top-14");

    const links = document.createElement("ul");
    links.setAttribute("class", "flex justify-around");

    const homeLink = document.createElement("li");
    const homeLinkAnchor = document.createElement("a");
    homeLinkAnchor.setAttribute("class", "text-blue-600 home");
    // homeLinkAnchor.setAttribute("href", "/");
    homeLinkAnchor.textContent = "홈";
    homeLink.appendChild(homeLinkAnchor);
    links.appendChild(homeLink);

    const profileLink = document.createElement("li");
    const profileLinkAnchor = document.createElement("a");
    profileLinkAnchor.setAttribute("class", "text-gray-600 profile");
    // profileLinkAnchor.setAttribute("href", "/profile");
    profileLinkAnchor.textContent = "프로필";
    profileLink.appendChild(profileLinkAnchor);
    links.appendChild(profileLink);

    const logoutLink = document.createElement("li");
    const logoutLinkAnchor = document.createElement("a");
    logoutLinkAnchor.setAttribute("class", "text-gray-600");
    logoutLinkAnchor.setAttribute("id", "logout");
    logoutLinkAnchor.textContent = "로그아웃";
    logoutHandler(logoutLinkAnchor);
    logoutLink.appendChild(logoutLinkAnchor);
    links.appendChild(logoutLink);
    navigation.appendChild(links);
    header.appendChild(navigation);

    return header;
  };

  return {
    getLoginHeader,
  };
};
