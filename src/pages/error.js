import { appendChild, createElement } from "@/utils";

export default function ErrorPage() {
  const Error = createElement({
    tagName: "div",
    textContent: "오류 발생!",
  });
  const ErrorText = createElement({
    tagName: "div",
    textContent: "의도적인 오류입니다.",
  });

  appendChild({ parent: Error, children: [ErrorText] });

  return Error;
}
