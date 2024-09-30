/** @jsx createVNode */
import { createVNode } from "../lib";

export function ProfilePage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form">
        {["username", "email", "bio"].map((key, idx) => {
          const labelText =
            key === "username"
              ? "사용자 이름"
              : key === "email"
              ? "이메일"
              : "자기소개";

          const inputClass = "w-full p-2 border rounded";
          return (
            <div className={idx !== 3 ? "mb-4" : "mb-6"}>
              <label
                htmlFor={key}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {labelText}
              </label>
              {key !== "bio" ? (
                <input type="text" id={key} className={inputClass} />
              ) : (
                <textarea className={inputClass} />
              )}
            </div>
          );
        })}
        <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">
          프로필 업데이트
        </button>
      </form>
    </div>
  );
}
