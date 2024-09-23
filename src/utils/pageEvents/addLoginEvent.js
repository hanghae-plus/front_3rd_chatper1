export const addLoginEvent = () => {
  setTimeout(() => {
    if (document.getElementById("login"))
      document.getElementById("login").addEventListener("click", (e) => {
        e.preventDefault();
        movePage("/login");

        const loginForm = document.getElementById("login-form");
        loginForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          localStorage.setItem("user", JSON.stringify({ email, password }));

          // TODO: 이벤트를 movePage에 매개변수로 넘기자
          e.preventDefault();
          movePage("/profile");
        });
      });
  }, 100);
};
