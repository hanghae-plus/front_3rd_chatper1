import Layout from "@/components/Layout";
import { appendChild, createElement } from "@/utils";

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

      const ProfileFormInput = createElement({
        tagName: idx === 2 ? "textarea" : "input",
        className: "w-full p-2 border rounded",
        setAttribute: { id: ProfileFormLabelFor, name: ProfileFormLabelFor },
      });

      appendChild({
        parent: ProfileFormContainer,
        children: [ProfileFormLabel, ProfileFormInput],
      });

      appendChild({ parent: ProfileForm, children: [ProfileFormContainer] });
    });

  appendChild({ parent: ProfilePage, children: [ProfileTitle, ProfileForm] });

  return Layout(ProfilePage);
}
