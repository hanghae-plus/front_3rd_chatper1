/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Post = ({ author, time, content, id }) => {
  return (
    <div classsName="bg-white rounded-lg shadow p-4 mb-4">
      <div classsName="flex items-center mb-2">
        <img
          src="https://via.placeholder.com/40"
          alt="프로필"
          classsName="rounded-full mr-2"
        />
        <div>
          <div classsName="font-bold">{author}</div>
          <div classsName="text-gray-500 text-sm">{time}</div>
        </div>
      </div>
      <p>{content}</p>
      <div classsName="mt-2 flex justify-between text-gray-500">
        <span classsName="like-button" data-post-id={id}>
          좋아요
        </span>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};
