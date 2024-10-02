# 가상돔 구현 / Diffing 알고리즘 적용으로 필요한 부분만 업데이트
## 📄 createVNode.js 구현방법
1. type, props, ...children을 매개변수로 받는 함수를 작성
2. 반환값은 { type, props, children } 형태의 객체여야 함
3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 함
4. Infinity를 사용하여 모든 깊이의 배열을 평탄화

## 📄 createElement.js 구현방법
1. vNode가 falsy면 빈 텍스트 노드를 반환
2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환
3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가
4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
5. 위 경우가 아니면 실제 DOM 요소를 생성:
    - vNode.type에 해당하는 요소를 생성
    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

## 📄 createElement__v2.js 구현방법
createElement의 개선된 버전
1. falsy vNode 처리
2. 문자열 또는 숫자 vNode 처리
3. 배열 vNode 처리 (DocumentFragment 사용)
4. 일반 요소 vNode 처리:
    - 요소 생성
    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
    - 자식 요소 추가

## 📄 eventManager.js 구현방법
### const eventMap = new Map();
이벤트 위임을 위한 전역 이벤트 맵
이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장
### let rootElement = null;
이벤트 위임이 설정될 루트 요소
### setupEventListeners
루트 요소에 이벤트 위임을 설정하는 함수
1. rootElement 설정
2. 기존에 설정된 이벤트가 있다면 리스너 제거
3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가     
    *주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
### handleEvent
실제 이벤트가 발생했을 때 호출되는 핸들러
1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
3. 핸들러가 있다면 실행
이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있음
### addEvent
1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
이 함수를 통해 개별 요소에 직접 이벤트를 붙이지 않고도 이벤트 처리 가능
### removeEvent
1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
이를 통해 더 이상 필요 없는 이벤트 핸들러를 정리하고 메모리 누수 방지

## 📄 renderElement.js 구현방법
### processVNode
vNode를 처리하여 렌더링 가능한 형태로 변환
- null, undefined, boolean 값 처리
- 문자열과 숫자를 문자열로 변환
- 함수형 컴포넌트 처리 <---- 이게 제일 중요
- 자식 요소들에 대해 재귀적으로 processVNode 호출
### updateAttributes
DOM 요소의 속성을 업데이트
- 이벤트 리스너, className, style 등 특별한 경우 처리
- 이전 props에서 제거된 속성 처리
- 새로운 props의 속성 추가 또는 업데이트        
  <이벤트 리스너 처리>
    - 'on'으로 시작하는 속성을 이벤트 리스너로 처리     
        *주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용 (이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함)
### updateElement
updateElement
1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)       
: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)        
: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
3. 텍스트 노드 업데이트     
: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우     
: 내용이 다르면 텍스트 노드 업데이트
4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)     
: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
5. 같은 타입의 노드 업데이트        
5-1. 속성 업데이트      
: updateAttributes 함수를 호출하여 속성 업데이트        
5-2. 자식 노드 재귀적 업데이트      
: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출      
*HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트     
5-3. 불필요한 자식 노드 제거        
: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
### renderElement
최상위 수준의 렌더링 함수
- 이전 vNode와 새로운 vNode를 비교하여 업데이트
- 최초 렌더링과 업데이트 렌더링 처리        

이벤트 위임 설정        
- 렌더링이 완료된 후 setupEventListeners 함수를 호출        
: 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리
