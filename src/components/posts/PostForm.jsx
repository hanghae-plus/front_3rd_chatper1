/** @jsx createVNode */
import { createVNode } from '../../lib';

export const PostForm = () => {
  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='content'
        >
          새 게시글
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='content'
          placeholder='무슨 생각을 하고 계신가요?'
          rows='3'
        ></textarea>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          게시하기
        </button>
      </div>
    </form>
  );
};
