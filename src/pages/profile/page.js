import Layout from "@/components/Layout";
import { appendChild, createElement } from "@/utils";
import { setUser } from "@/main";

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

  const ProfileForm = createElement({ tagName: "form", id: "profile-form" });
  const {
    username = "",
    bio = "",
    email = "",
  } = JSON.parse(localStorage.getItem("user")) || {};

  const ProfileFormBtn = createElement({
    tagName: "button",
    className: "w-full bg-blue-600 text-white p-2 rounded font-bold",
    textContent: "프로필 업데이트",
    setAttribute: { type: "submit" },
  });
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
        textContent: idx === 2 ? bio : undefined,
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

      appendChild({
        parent: ProfileForm,
        children: [ProfileFormContainer, ProfileFormBtn],
      });
    });

  ProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.elements["username"].value;
    const email = e.target.elements["email"].value;
    const bio = e.target.elements["bio"].value;

    setUser({ username, email, bio });
  });

  appendChild({
    parent: ProfilePage,
    children: [ProfileTitle, ProfileForm],
  });

  return Layout(ProfilePage);
}
