export const Footer = () => {
  const getFooter = () => {
    const footer = document.createElement("footer");
    footer.setAttribute("class", "bg-gray-200 p-4 text-center");

    const paragraph = document.createElement("p");
    paragraph.innerHTML = "&copy; 2024 항해플러스. All rights reserved.";

    footer.appendChild(paragraph);

    return footer;
  };

  return {
    getFooter,
  };
};
