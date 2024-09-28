/** @jsx createVNode */
import{ createVNode } from "../../lib";

export const Post = ({ author, time, content, id }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex items-center mb-2">
      <img src="https://via.placeholder.com/40" alt="프로필" className="rounded-full mr-2" />
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
