export const ErrorBoundary = (container) => {
  const safeRender = (renderFunc) => {
    try {
      renderFunc();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.error("An error occurred:", error);
    container.innerHTML = `<div class="error-message"><p>오류 발생!</p><p>의도적인 오류입니다.</p></div>`;
  };

  // window 전역 에러 핸들러
  window.addEventListener("error", (event) => {
    handleError(event.error || new Error(event.message));
    return true;
  });

  return { safeRender };
};
