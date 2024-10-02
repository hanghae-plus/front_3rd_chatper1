/**
 * form 태그의 데이터를 객체로 변환하는 함수입니다.
 *
 * @param {HTMLFormElement} form - form 태그 요소
 * @returns {Object} form 태그의 데이터를 객체로 변환한 값
 *
 * @example
 * const form = document.createElement('form');
 * form.innerHTML = '<input type="text" name="name" value="John">';
 * const formData = createFormData(form);
 * console.log(formData); // { name: 'John' }
 */

export function createFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}
