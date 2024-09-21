function occurError(target) {
  document.getElementById("username").addEventListener("input", () => {
    target.appendChild(document.createElement("p")).innerHTML = "오류 발생!";
    target.appendChild(document.createElement("p")).innerHTML =
      "의도적인 오류입니다.";
  });
}
function eventDelegation() {
  document.addEventListener("DOMContentLoaded", () => {
    const linkList = document.querySelectorAll("nav a");
    linkList.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  });
}

export const advanced = { occurError, eventDelegation };
