// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
    // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
    // - null, undefined, boolean 값 처리
    // - 문자열과 숫자를 문자열로 변환
    // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
    // - 자식 요소들에 대해 재귀적으로 processVNode 호출

    if (vNode === null || vNode === undefined || typeof vNode === Boolean) {
        return "";
    }

    if (typeof vNode === "string" || typeof vNode === "number") {
        return String(vNode);
    }

    if (typeof vNode.type === "function") {
        return processVNode(vNode.type(vNode.props || {}));
    }

    return {
        ...vNode,
        children: vNode.children.map(processVNode).filter(Boolean) || [],
    };
}

// TODO: updateAttributes 함수 구현
function updateAttributes(targetElement, newVNodeProps, oldVNodeProps) {
    // DOM 요소의 속성을 업데이트합니다.
    // - 이전 props에서 제거된 속성 처리
    // - 새로운 props의 속성 추가 또는 업데이트
    // - 이벤트 리스너, className, style 등 특별한 경우 처리
    //   <이벤트 리스너 처리>
    //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
    //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
    //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

    oldVNodeProps = oldVNodeProps || {};
    newVNodeProps = newVNodeProps || {};

    // 이전 props에서 제거된 속성 처리
    Object.entries(oldVNodeProps).forEach(([key, value]) => {
        if (newVNodeProps[key] === undefined) {
            if (key.startsWith("on")) {
                const eventType = key.toLowerCase().substring(2);
                console.log("delete event");
                removeEvent(targetElement, eventType, value);
            } else if (key === "className") {
                targetElement.removeAttribute("class");
            } else {
                targetElement.removeAttribute(key);
            }
        }
    });

    // 새로운 props의 속성 추가 또는 업데이트
    Object.entries(newVNodeProps).forEach(([key, value]) => {
        //
        if (oldVNodeProps[key] === undefined) {
            // 새로 추가된 속성을 처리
            if (key.startsWith("on")) {
                const eventType = key.toLowerCase().substring(2);
                addEvent(targetElement, eventType, value);
            } else if (key === "className") {
                targetElement.setAttribute("class", value);
            } else {
                targetElement.setAttribute(key, value);
            }
        } else {
            // 기존 속성의 업데이트를 처리
            if (key.startsWith("on")) {
                const eventType = key.toLowerCase().substring(2);
                removeEvent(targetElement, eventType, value);
                addEvent(targetElement, eventType, value);
            } else if (key === "className") {
                targetElement.removeAttribute("class");
                targetElement.setAttribute("class", value);
            } else {
                targetElement.removeAttribute(key);
                targetElement.setAttribute(key, value);
            }
        }
    });
}

// TODO: updateElement 함수 구현
function updateElement(parent, newVNode, oldVNode, index = 0) {
    const oldDomNode = parent.childNodes[index];

    if (!oldDomNode) {
        return;
    }

    // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
    // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거

    // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
    // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가

    // 3. 텍스트 노드 업데이트
    // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
    // TODO: 내용이 다르면 텍스트 노드 업데이트

    // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
    // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체

    // 5. 같은 타입의 노드 업데이트
    // 5-1. 속성 업데이트
    // TODO: updateAttributes 함수를 호출하여 속성 업데이트

    // 5-2. 자식 노드 재귀적 업데이트
    // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
    // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트

    // 5-3. 불필요한 자식 노드 제거
    // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거

    if (!newVNode && oldVNode) {
        return parent.removeChild(parent.childNodes[index]);
    }

    if (newVNode && !oldVNode) {
        return parent.appendChild(createElement__v2(newVNode));
    }

    if (typeof newVNode === "string" || typeof oldVNode === "string") {
        if (newVNode !== oldVNode) {
            return parent.replaceChild(document.createTextNode(newVNode), oldDomNode);
        }
        return;
    }

    if (newVNode.type !== oldVNode.type) {
        return parent.replaceChild(createElement__v2(newVNode), parent.childNodes[index]);
    }

    // 가상 DOM에서 실제 DOM으로의 속성 업데이트와 이벤트 리스너 관리를 처리
    updateAttributes(oldDomNode, newVNode.props, oldVNode.props);

    const newVNodeChildren = newVNode.children || [];
    const oldVNodeChildren = oldVNode.children || [];
    const maxLength = Math.max(newVNodeChildren.length, oldVNodeChildren.length);

    for (let i = 0; i < maxLength; i++) {
        // 자식 노드가 있는지 확인하고 재귀적으로 업데이트
        if (i < oldDomNode.childNodes.length) {
            updateElement(oldDomNode, newVNodeChildren[i], oldVNodeChildren[i], i);
        } else if (newVNodeChildren[i]) {
            // 새로운 자식 노드가 있으면 추가
            oldDomNode.appendChild(createElement__v2(newVNodeChildren[i]));
        }
    }

    while (oldDomNode.childNodes.length > newVNodeChildren.length) {
        oldDomNode.removeChild(oldDomNode.lastChild);
    }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
    // 최상위 수준의 렌더링 함수입니다.
    // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
    // - 최초 렌더링과 업데이트 렌더링 처리

    // 이벤트 위임 설정
    // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
    // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.

    const newVNode = processVNode(vNode);
    const oldVNode = container.__vNode;

    if (!oldVNode) {
        container.appendChild(createElement__v2(newVNode));
    } else {
        if (JSON.stringify(newVNode) === JSON.stringify(oldVNode)) return;
        updateElement(container, newVNode, oldVNode);
    }

    container.__vNode = newVNode;
    setupEventListeners(container);
}
