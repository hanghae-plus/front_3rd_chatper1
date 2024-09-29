import { createVNode } from "@/lib";

export function Navigation() {
  const isLogin = false;

  const isActive = (href) => {
    return window.location.pathname === `/${href}`;
  };

  return createVNode(
    "nav",
    { class: "bg-white shadow-md p-2 sticky top-14" },
    createVNode(
      "ul",
      { class: "flex justify-around" },
      navList.map(({ title, href }) => {
        switch (href) {
          case "profile":
          case "logout":
            if (!isLogin) return null;

          default:
            if (isLogin) return null;
        }

        return createVNode(
          "li",
          { class: "flex-center" },
          createVNode(
            "a",
            {
              class: [
                "block w-full h-full text-center font-bold",
                isActive(href) ? "text-blue-500" : "",
              ].join(" "),
              href: `/${href}`,
            },
            title
          )
        );
      })
    )
  );
}

const navList = [
  { title: "홈", href: "" },
  { title: "프로필", href: "profile" },
  { title: "로그아웃", href: "logout" },
  { title: "로그인", href: "login" },
];
