/** @jsx createVNode */
import { createVNode } from '../../lib';

export const Post = () => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex items-center mb-2">
      <img
        src="https://via.placeholder.com/40"
        alt="프로필"
        className="rounded-full mr-2"
      />
      <div>
        <div className="font-bold">홍길동</div>
        <div className="text-gray-500 text-sm">2024.09.28</div>
      </div>
    </div>
    <p>안녕하세요</p>
    <div className="mt-2 flex justify-between text-gray-500">
      <span className="like-button" data-post-id={5}>
        좋아요
      </span>
      <span>댓글</span>
      <span>공유</span>
    </div>
  </div>
);
