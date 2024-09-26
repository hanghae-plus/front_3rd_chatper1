const ErrorPage = ({ message }) => {
  return `<span>오류 발생!</span><p>${message}</p><button id='goback'>돌아가기</button>`;
};

export default ErrorPage;
