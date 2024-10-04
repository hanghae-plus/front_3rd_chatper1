/** @jsx createVNode */
import { createVNode } from "../lib";

import { globalStore } from "../stores";
import { defaultUser } from "../contant";

export function ProfilePage() {
  const { getState } = globalStore;
  const { currentUser } = getState();

  const userInfo = currentUser ?? defaultUser;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form">
        {["username", "email", "bio"].map((key, idx) => {
          let labelText = "";

          switch (key) {
            case "username":
              labelText = "사용자 이름";
              break;
            case "email":
              labelText = "이메일";
              break;
            default:
              labelText = "자기소개";
              break;
          }

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
                <input
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={userInfo[key] ?? ""}
                  id={key}
                  className={inputClass}
                />
              ) : (
                <textarea
                  value={userInfo[key] ?? ""}
                  id={key}
                  name={key}
                  className={inputClass}
                >
                  {userInfo[key] ?? ""}
                </textarea>
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
