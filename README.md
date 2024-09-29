# ✨ 2주차 `프레임워크 없이 SPA 만들기 - Part2` 기능 구현 목록

## 기본 과제 구현 목록

### 1) createVNode 함수 작성
- [ ] 1. type, props, ...children을 매개변수로 받는 함수를 작성하세요.
- [ ] 2. 반환값은 { type, props, children } 형태의 객체여야 합니다.
- [ ] 3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
- [ ] 4. Infinity를 사용하여 모든 깊이의 배열을 평탄화하세요.

### 2) reateElement 함수 구현
- [ ] 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
- [ ] 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
- [ ] 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
- [ ] 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
- [ ] 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  - [ ] vNode.type에 해당하는 요소를 생성
  - [ ] vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  - [ ] vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가


### 3) 어플리케이션에 적용
- [ ]  Post, PostForm, Header, Footer, HomePage, LoginPage, NotFoundPage, ProfilePage 등의 컴포넌트를 JSX로 정의해야 합니다.
- [ ]  각 컴포넌트는 `createVNode`를 사용하여 올바른 vNode 구조로 변환되어야 합니다.
- [ ]  컴포넌트에 props를 전달할 수 있어야 하며, 이는 vNode의 props에 반영되어야 합니다.
- [ ]  HomePage 컴포넌트를 렌더링했을 때, 예상된 HTML 문자열이 생성되어야 합니다.
- [ ]  생성된 HTML은 지정된 구조와 클래스명을 가져야 하며, 모든 하위 컴포넌트(Header, Footer, Post 등)를 포함해야 합니다.
- [ ]  렌더링된 결과물은 반응형 디자인을 위한 클래스(예: max-w-md, bg-blue-600 등)를 포함해야 합니다.
- [ ]  링크, 버튼 등의 상호작용 요소가 올바르게 포함되어야 합니다.
  
