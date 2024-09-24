import Layout from "@/components/Layout";
import { appendChild, createElement } from "@/utils";
import { getUser } from "@/store/userStore";
import { useNavigate } from "../../router";

export default function ProfilePage() {
  const ProfilePage = createElement({
    tagName: "div",
    className: "bg-white p-8 rounded-lg shadow-md",
  });

  const ProfileTitle = createElement({
    tagName: "h2",
    className: "text-2xl font-bold text-center text-blue-600 mb-8",
    textContent: "내 프로필",
  });

  const ProfileForm = createElement({ tagName: "form" });
  const { username = "", bio = "", email = "" } = getUser() || {};
  Array(3)
    .fill(0)
    .forEach((_, idx) => {
      const ProfileFormContainer = createElement({
        tagName: "div",
        className: idx !== 3 ? "mb-4" : "mb-6",
      });

      const ProfileFormLabelFor =
        idx === 0 ? "username" : idx === 1 ? "email" : "bio";

      const ProfileFormLabelText =
        idx === 0 ? "사용자 이름" : idx === 1 ? "이메일" : "자기소개";

      const ProfileFormLabel = createElement({
        tagName: "label",
        className: "block text-gray-700 text-sm font-bold mb-2",
        textContent: ProfileFormLabelText,
        setAttribute: { for: ProfileFormLabelFor },
      });
      console.log(idx === 0 ? username : idx === 1 ? email : bio);
      const ProfileFormInput = createElement({
        tagName: idx === 2 ? "textarea" : "input",
        className: "w-full p-2 border rounded",
        setAttribute: {
          id: ProfileFormLabelFor,
          name: ProfileFormLabelFor,
          value: idx === 0 ? username : idx === 1 ? email : bio,
        },
      });

      appendChild({
        parent: ProfileFormContainer,
        children: [ProfileFormLabel, ProfileFormInput],
      });

      appendChild({ parent: ProfileForm, children: [ProfileFormContainer] });
    });

  const ProfileFormBtn = createElement({
    tagName: "button",
    className: "w-full bg-blue-600 text-white p-2 rounded font-bold",
    textContent: "프로필 업데이트",
    setAttribute: { type: "submit" },
  });

  appendChild({
    parent: ProfilePage,
    children: [ProfileTitle, ProfileForm, ProfileFormBtn],
  });

  return Layout(ProfilePage);
}
