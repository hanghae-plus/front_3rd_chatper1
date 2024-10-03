/**
 * 주어진 값이 지정된 원시 데이터 타입 목록에 포함되는지 확인합니다.
 *
 * @param {*} value - 검사할 값
 * @param {('string'|'number'|'boolean'|'undefined'|'symbol'|'bigint'|'null')[]} typeList - 확인할 원시 데이터 타입 목록
 * @returns {boolean} 값의 타입이 typeList에 포함되면 true, 그렇지 않으면 false
 *
 * @example
 * isPrimitiveDataType(42, ['number', 'string']); // true 반환
 * isPrimitiveDataType('hello', ['boolean', 'number']); // false 반환
 */

export function isPrimitiveDataType(value, typeList) {
  const primitiveTypes = ['string', 'number', 'boolean', 'undefined', 'symbol', 'bigint', 'null'];
  if (!typeList.every((type) => primitiveTypes.includes(type))) {
    throw new TypeError('typeList는 원시 데이터 타입만 포함해야 합니다.');
  }
  if (value === null && typeList.includes('null')) return true;
  return typeList.includes(typeof value);
}
