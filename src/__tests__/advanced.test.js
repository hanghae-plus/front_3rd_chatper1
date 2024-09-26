import userEvent from "@testing-library/user-event";

beforeAll(async () => {
  // DOM 초기화
  window.alert = vi.fn();
  document.body.innerHTML = '<div id="root"></div>';
  console.log(
    "🚀 ~ beforeAll ~ document.body.innerHTML:",
    document.body.innerHTML
  );
  await import("../main.js");
});

afterAll(() => {
  // 각 테스트 전에 root 엘리먼트 초기화
  console.log("afterAll ~ root", document.body.innerHTML);
  document.getElementById("root").innerHTML = "";
  localStorage.removeItem("user");
});

const goTo = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
};

beforeEach(() => {
  goTo("/");
  document.querySelector("#logout")?.click();
});

describe("심화과제 테스트", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe("1. 라우트 가드 구현", () => {
    it("비로그인 사용자가 프로필 페이지에 접근시 로그인 페이지로 리다이렉트 한다.", async () => {
      goTo("/profile");

      expect(document.body.innerHTML).toContain("로그인");
    });

    it("로그인된 사용자가 로그인 페이지에 접근시 메인 페이지로 리다이렉트 한다.", async () => {
      goTo("/login");

      const loginForm = document.getElementById("login-form");

      await user.type(document.getElementById("username"), "testuser");

      loginForm.dispatchEvent(
        new SubmitEvent("submit", { bubbles: true, cancelable: true })
      );

      goTo("/login");
      expect(
        document.querySelector("nav .text-blue-600.font-bold").innerHTML
      ).toContain("홈");
    });
  });

  describe("2. 이벤트 위임 활용", () => {
    it("네비게이션의 링크를 클릭에서 이벤트 전파를 막았을 때, 아무일도 일어나지 않는다.", async () => {
      goTo("/");

      const firstTarget = document.querySelector('nav a[href="/login"]');

      firstTarget.addEventListener("click", (e) => e.stopPropagation());

      await user.click(firstTarget);

      // 클릭 이벤트 생성 및 트리거
      expect(document.body.querySelector("header")).not.toBeFalsy();
    });
  });

  describe("3. 에러 바운더리 구현", () => {
    it("로그인을 하다가 오류가 발생하면, 에러 바운더리에서 에러를 표시한다.", async () => {
      goTo("/login");

      const $username = document.querySelector("#username");

      $username.addEventListener(
        "input",
        () => {
          throw new Error("의도적인 오류입니다.");
        },
        { once: true }
      );

      await user.type($username, "1");

      expect(document.body.innerHTML).toContain("오류 발생!");
      expect(document.body.innerHTML).toContain("의도적인 오류입니다.");
    });
  });
});
