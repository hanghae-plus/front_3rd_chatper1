// TODO: createElement 함수 구현
// 1. [✔️] vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. [✔️] vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. [✔️] vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. [✔️] vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {
  // 여기에 구현하세요

  //vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  //vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  //vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  // 재귀적으로 호출한다? → 함수 자신을 다시 호출한다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child));
    });
    return fragment;
  }

  //vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  //typeof vNode === 'function'과 typeof vNode.type === 'function'은 서로 다른 상황을 처리하는 것이기 때문에 다르게 동작함.
  //1. typeof vNode === 'function' : vNode 자체가 함수일 때, vNode라는 변수가 함수 자체인 경우 → vNode는 객체로 전달되기 때문에 그 객체 안의 속성이 함수일 수 있음.
  //2. typeof vNode.type === 'function' : 가상 DOM 객체의 type 속성이 함수인지를 검사. vNode가 가상 DOM 객체일 때, 그 객체가 함수형 컴포넌트를 나타내는지 확인하는 과정.
  if (typeof vNode.type === "function") {
    const component = vNode.type(vNode.props || {});
    return createElement(component);
  }

  //위 경우가 아니면 실제 DOM 요소를 생성합니다:
  const element = document.createElement(vNode.type);

  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "className") {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  // vNode.children의 각 자식에 대해 createElement 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      element.appendChild(createElement(child));
    });
  }

  return element;
}

// *좀 궁금했던것*
// typeof vNode === "string" || typeof vNode === "number" 이런것처럼 다른건 typeof vNode인데 왜 함수타임만 typeof vNode.type인지?
// 가상 DOM(vNode) 구조의 차이점

// 문자열이나 숫자는 가상 DOM 객체 자체가 그 데이터(텍스트)로 되어 있음.
// {
//   type: 'div',
//   props: { className: 'container' },
//   children: [...]
// }

//함수형 컴포넌트에서는 vNode.type이 함수를 나타내며, 이 함수는 렌더링할 가상 DOM을 반환하는 역할을 함.
// {
//   type: MyComponent,
//   props: { name: 'John' },
//   children: [...]
// }

//결론:
//문자열이나 숫자일때는 vNode 자체가 텍스트노드이기때문에 typeof vNode로 확인가능
//함수형 컴포넌트일때는 가상 DOM 노드객체의 type 속성이 그 컴포넌트를 나타내는 함수이기 때문에, 함수인지 여부를 확인하려면 vNode.type에 접근해야함.
