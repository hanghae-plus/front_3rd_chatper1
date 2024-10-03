/** @jsx createVNode */
import { createVNode } from "../../lib/createVNode";

// 상수 선언
const DEFAULT_PROFILE_IMG = "https://via.placeholder.com/40";

// Post 컴포넌트
export const Post = ({ author, time, content, id }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={DEFAULT_PROFILE_IMG} alt="프로필" className="rounded-full mr-2"/>
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 text-sm">{time}</div>
        </div>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex justify-between text-gray-500">
        <span className="like-button" data-post-id={id}>좋아요</span>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};
