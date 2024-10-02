/**
 * VNode 속성을 포맷팅하는 함수입니다.
 * @param {string} key - 속성의 키
 * @param {*} value - 속성의 값
 * @param {Object.<string, function(string, *)>} callback - 콜백 메소드들의 객체
 * @throws {Error} 유효하지 않은 이벤트 핸들러일 경우 에러를 던집니다.
 */
export function formatVNodeAttr(key, value, callback) {
  if (key.startsWith('on')) {
    if (!value || typeof value !== 'function') {
      throw new Error('Invalid event handler');
    }
    callback.eventWorker(key.slice(2).toLowerCase(), value);
    return;
  }

  if (key === 'style') {
    const _value = Object.entries(value)
      .reduce((acc, [key, value]) => {
        const _key = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
        const _value = typeof value === 'string' ? value : `${value}px`;
        return acc + `${_key}: ${_value}; `;
      }, '')
      .trim();
    callback.attributeWorker('style', _value);
    return;
  }

  if (key === 'className') {
    callback.attributeWorker('class', value);
    return;
  }

  callback.attributeWorker(key, value);
}
