/** @jsx createVNode */
import { createVNode } from "../lib";

export function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full text-center max-w-[480px]">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
        로그인
      </h1>
      <form id="login-form">
        {["username", "password"].map((key) => {
          const className = key === "password" ? "mb-6" : "mb-4";
          const labelFor = key;
          const labelText = key === "username" ? "사용자 이름" : "비밀번호";

          return (
            <div key={key} className={className}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={labelFor}
              >
                {labelText}
              </label>
              <input className="w-full p-2 border rounded" id={labelFor} />
            </div>
          );
        })}
        <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">
          로그인
        </button>
      </form>
      <div className="mt-4 text-center">
        <a className="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr className="my-6" />
      <div className="text-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded font-bold">
          새 계정 만들기
        </button>
      </div>
    </div>
  );
}
