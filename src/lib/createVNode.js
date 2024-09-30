// TODO: createVNode 함수 구현
// 1. type, props, ...children을 매개변수로 받는 함수를 작성하세요.
// 2. 반환값은 { type, props, children } 형태의 객체여야 합니다.
// 3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
// 4. Infinity를 사용하여 모든 깊이의 배열을 평탄화하세요.

export function createVNode(type, props, ...children) {
  function flatten(arr) {
    return arr.reduce((acc, val) => {
      // 배열이면 재귀적으로 평탄화
      if (Array.isArray(val)) {
        acc.push(...flatten(val));
      } else if (Boolean(val)) {
        // falsy 값 필터링
        acc.push(val);
      }
      return acc;
    }, []);
  }

  return {
    type,
    props,
    children: flatten(children),
  };
}
