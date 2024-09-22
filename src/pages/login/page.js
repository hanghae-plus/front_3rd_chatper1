import { appendChild } from "@/utils";
import { createElement } from "../../utils/createElement";

export default function LoginPage() {
  const LoginPage = document.createElement("div");
  LoginPage.className =
    "bg-white p-8 rounded-lg shadow-md w-full text-center max-w-[480px]";

  const LoginTitle = document.createElement("h1");
  LoginTitle.className = "text-2xl font-bold text-center text-blue-600 mb-8";
  LoginTitle.textContent = "로그인";

  const LoginForm = document.createElement("form");

  Array(2)
    .fill(0)
    .forEach((_, idx) => {
      const LoginFormBox = createElement({
        tagName: "div",
        className: idx !== 1 ? "mb-4" : "mb-6",
      });

      const LoginFormLabelFor = idx === 0 ? "username" : "password";
      const LoginFormLabelText = idx === 0 ? "사용자 이름" : "비밀번호";

      const LoginFormLabel = createElement({
        tagName: "label",
        className: "block text-gray-700 text-sm font-bold mb-2",
        textContent: LoginFormLabelText,
        setAttribute: { for: LoginFormLabelFor },
      });

      const LoginFormInput = createElement({
        tagName: "input",
        className: "w-full p-2 border rounded",
        id: LoginFormLabelFor,
        setAttribute: { name: LoginFormLabelFor },
      });

      appendChild({
        parent: LoginFormBox,
        children: [LoginFormLabel, LoginFormInput],
      });
      appendChild({ parent: LoginForm, children: [LoginFormBox] });
    });

  const LoginButton = createElement({
    tagName: "button",
    type: "submit",
    className: "w-full bg-blue-600 text-white p-2 rounded font-bold",
    textContent: "로그인",
  });

  const ForgetPasswordBox = createElement({
    tagName: "div",
    className: "mt-4 text-center",
  });

  const ForgetPasswordLink = createElement({
    tagName: "a",
    className: "text-blue-600 text-sm",
    textContent: "비밀번호를 잊으셨나요?",
  });

  const Hr = createElement({ tagName: "hr", className: "my-6" });

  const NewAccountBox = createElement({
    tagName: "div",
    className: "text-center",
  });

  const NewAccountButton = createElement({
    tagName: "button",
    className: "bg-green-500 text-white px-4 py-2 rounded font-bold",
    textContent: "새 계정 만들기",
  });

  appendChild({ parent: NewAccountBox, children: [NewAccountButton] });
  appendChild({ parent: LoginForm, children: [LoginButton] });
  appendChild({ parent: ForgetPasswordBox, children: [ForgetPasswordLink] });
  appendChild({
    parent: LoginPage,
    children: [LoginTitle, LoginForm, ForgetPasswordBox, Hr, NewAccountBox],
  });
  return LoginPage;
}
