export function createVNode(type, props, ...children) {
  return {
    type,
    props:props||null,
    children:
    children
      .flat(Infinity) //모든 깊이의 배열을 평탄화
      .filter(child => !!child)
      // .map(child => typeof child === 'object'?child:String(child))

  }
}



