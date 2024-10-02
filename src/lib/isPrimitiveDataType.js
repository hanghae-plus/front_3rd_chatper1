export function isPrimitiveDataType(value, typeList) {
  return typeList.includes(typeof value);
}
