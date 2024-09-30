/** @jsx createVNode */
import { createVNode } from '@/lib';

export const Post = ({ posts }) => {
  return (
    <div id="posts-container" className="space-y-4">
      {posts.map((post) => (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/40" alt="프로필" className="rounded-full mr-2" />
            <div>
              <div className="font-bold">{post.author}</div>
              <div className="text-gray-500 text-sm">{post.time}</div>
            </div>
          </div>
          <p>{post.content}</p>
          <div className="mt-2 flex justify-between text-gray-500">
            <span className="like-button" data-post-id={post.id}>
              좋아요
            </span>
            <span>댓글</span>
            <span>공유</span>
          </div>
        </div>
      ))}
    </div>
  );
};
