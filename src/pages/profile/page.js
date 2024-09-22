import Layout from "../../components/Layout";

export default function ProfilePage() {
  const ProfilePage = document.createElement("div");
  ProfilePage.className = "bg-white p-8 rounded-lg shadow-md";

  const ProfileTitle = document.createElement("h2");
  ProfileTitle.className = "text-2xl font-bold text-center text-blue-600 mb-8";
  ProfileTitle.textContent = "내 프로필";

  const ProfileForm = document.createElement("form");

  Array(3)
    .fill(0)
    .forEach((_, idx) => {
      const ProfileFormBox = document.createElement("div");
      ProfileFormBox.className = idx !== 3 ? "mb-4" : "mb-6";

      const ProfileFormLabel = document.createElement("label");
      ProfileFormLabel.className = "block text-gray-700 text-sm font-bold mb-2";
      const ProfileFormLabelFor =
        idx === 0 ? "username" : idx === 1 ? "email" : "bio";
      const ProfileFormLabelText =
        idx === 0 ? "사용자 이름" : idx === 1 ? "이메일" : "자기소개";
      ProfileFormLabel.setAttribute("for", ProfileFormLabelFor);
      ProfileFormLabel.textContent = ProfileFormLabelText;

      const ProfileFormInput = document.createElement(
        idx === 2 ? "textarea" : "input"
      );
      ProfileFormInput.className = "w-full p-2 border rounded";
      ProfileFormInput.id = ProfileFormLabelFor;
      ProfileFormInput.name = ProfileFormLabelFor;

      ProfileFormBox.appendChild(ProfileFormLabel);
      ProfileFormBox.appendChild(ProfileFormInput);
      ProfileForm.appendChild(ProfileFormBox);
    });

  ProfilePage.appendChild(ProfileTitle);
  ProfilePage.appendChild(ProfileForm);

  return Layout(ProfilePage);
}
