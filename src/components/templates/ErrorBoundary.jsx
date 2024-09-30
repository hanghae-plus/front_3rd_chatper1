/** @jsx createVNode */
import { createVNode } from '@/lib';

export const ErrorBoundary = ({ error }) => {
  return (
    <div className="bg-gray-200 p-4 text-center">
      <p>오류 발생! 의도적인 오류입니다.</p>
      <p>{error}</p>
    </div>
  );
};
