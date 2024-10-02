export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (!vNode || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((item) => {
      const element = createElement__v2(item);
      fragment.appendChild(element);
    });
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    const node = vNode.type(vNode.props);
    const element = createElement__v2(node);
    return element;
  }

  const element = document.createElement(vNode.type);

  if (vNode.props) {
    // props이 있는경우
    Object.keys(vNode.props).forEach((key) => {
      if (key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        const eventHandler = vNode.props[key];

        element.addEventListener(eventType, (e) => {
          if (e.target === element || element.contains(e.target)) {
            eventHandler(e);
          }
        });
        return;
      }
      if (key.startsWith('className')) {
        element.className = vNode.props[key];
        return;
      }
      element.setAttribute(key, vNode.props[key]);
    });
  }

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach((item) => {
      const childElement = createElement__v2(item);
      element.appendChild(childElement);
    });
  }
  return element;
}
