# ✨ 2주차 `프레임워크 없이 SPA 만들기 - Part2` 기능 구현 목록

## 기본 과제 구현 목록

### 1) `createVNode` 함수 작성
- [x] 1. `type`, `props`, `...children`을 매개변수로 받는 함수를 작성하세요.
- [x] 2. 반환값은 `{ type, props, children }` 형태의 객체여야 합니다.
- [x] 3. `children`은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
- [x] 4. `Infinity`를 사용하여 모든 깊이의 배열을 평탄화하세요.

### 2) `createElement` 함수 구현
- [x] 1. `vNode`가 falsy면 빈 텍스트 노드를 반환합니다.
- [x] 2. `vNode`가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
- [x] 3. `vNode`가 배열이면 `DocumentFragment`를 생성하고 각 자식에 대해 `createElement`를 재귀 호출하여 추가합니다.
- [x] 4. `vNode.type`이 함수면 해당 함수를 호출하고 그 결과로 `createElement`를 재귀 호출합니다.
- [x] 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  - [x] `vNode.type`에 해당하는 요소를 생성
  - [x] `vNode.props`의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  - [x] `vNode.children`의 각 자식에 대해 `createElement`를 재귀 호출하여 추가

### 3) 어플리케이션에 적용
- [ ] `Post` 컴포넌트를 JSX로 정의
- [ ] `PostForm` 컴포넌트를 JSX로 정의
- [ ] `Header` 컴포넌트를 JSX로 정의
- [ ] `Footer` 컴포넌트를 JSX로 정의
- [ ] `HomePage` 컴포넌트를 JSX로 정의
- [ ] `LoginPage` 컴포넌트를 JSX로 정의
- [ ] `NotFoundPage` 컴포넌트를 JSX로 정의
- [ ] `ProfilePage` 컴포넌트를 JSX로 정의
- [ ] 각 컴포넌트는 `createVNode`를 사용하여 올바른 `vNode` 구조로 변환되어야 합니다.
- [ ] 컴포넌트에 `props`를 전달할 수 있어야 하며, 이는 `vNode`의 `props`에 반영되어야 합니다.
- [ ] `HomePage` 컴포넌트를 렌더링했을 때, 예상된 HTML 문자열이 생성되어야 합니다.
- [ ] 생성된 HTML은 지정된 구조와 클래스명을 가져야 하며, 모든 하위 컴포넌트(`Header`, `Footer`, `Post` 등)를 포함해야 합니다.
- [ ] 렌더링된 결과물은 반응형 디자인을 위한 클래스(예: `max-w-md`, `bg-blue-600` 등)를 포함해야 합니다.
- [ ] 링크, 버튼 등의 상호작용 요소가 올바르게 포함되어야 합니다.