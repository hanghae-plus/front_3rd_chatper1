/**
 * @class ErrorHandler
 * 에러 처리 클래스. 전역 에러와 미처리된 Promise에 대한 핸들링을 담당합니다.
 */
export default class ErrorHandler {
  /**
   * 에러 핸들링 메서드
   * @param {Error|PromiseRejectionEvent} error - 에러 객체 또는 Promise 거부 객체
   */
  handleError(error) {
    this.logError(error);
    this.displayErrorMessage(error);
  }

  /**
   * 에러를 출력하거나 외부 서비스로 전송하는 메서드
   * @param {Error} error - 에러 객체
   */
  logError(error) {
    // TODO: 여기에 내부 of 외부 로그 연동 (예: Sentry, Logger 등)
  }

  /**
   * 사용자에게 보여줄 에러 메시지를 렌더링하는 메서드
   */
  displayErrorMessage(error) {
    document.getElementById('root').innerHTML = `
      <div>
        <p>오류 발생!</p>
        <p>${error.message || "의도적인 오류입니다."}</p>
      </div>
    `;
  }
}
