export const addHomeEvent = () => {
  setTimeout(() => {
    const homeElement = document.getElementById("home");
    if (homeElement) {
      homeElement.addEventListener("click", (e) => {
        e.preventDefault();
        movePage("/");
      });
    }
  }, 100);
};
