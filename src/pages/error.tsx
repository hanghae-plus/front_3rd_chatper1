import { h } from '../virtual-dom';

function Error() {
  return (
    <div class="w-72 h-84 flex flex-col justify-center items-center border-2 border-slate-500 rounded-md">
      <h2>오류 발생!</h2>
      <h4>의도적인 오류입니다.</h4>
    </div>
  );
}

export default Error;
