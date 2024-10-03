import {addEvent, removeEvent, setupEventListeners} from "./eventManager.js";
import { createElement__v2 } from "./createElement__v2.js";

const processVNode = (vNode) => {
    // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.

    // - null, undefined, boolean 값 처리
    if (!vNode || typeof vNode === "boolean") return "";

    // - 문자열과 숫자를 문자열로 변환
    if (typeof vNode === "string" || typeof vNode === "number") return vNode.toString();

    // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
    if (typeof vNode.type === "function") return processVNode(vNode.type(vNode.props));

    // - 자식 요소들에 대해 재귀적으로 processVNode 호출
    vNode.children = vNode.children.map(processVNode);

    return vNode;
};

const updateAttributes = (element, oldProps, newProps) => {
    // DOM 요소의 속성을 업데이트합니다.

    // - 이벤트 리스너, className, style 등 특별한 경우 처리
    //   <이벤트 리스너 처리>
    //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
    //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

    //     - TODO: 리팩토링 필요? 제거,수정,추가에 대해 중복을 최소화시키는게 나은가? 한눈에 들어오는게 나은가?

    // - 이전 props에서 제거된 속성 처리
    Object.entries(oldProps).forEach(([key, value]) => {
        if (!(key in newProps)) {
            // 제거
            const isFuncProp = key.startsWith("on") && typeof value === "function"

            if (isFuncProp) {
                const eventType = key.slice(2).toLowerCase()
                removeEvent(element, eventType, value)
            } else {
                const classPropKey = key === "className" && 'class'
                element.removeAttribute(classPropKey ? classPropKey : key)
            }
        }
    });

    // - 새로운 props의 속성 추가 또는 업데이트
    Object.entries(newProps).forEach(([key, value]) => {
        const isFuncProp = key.startsWith("on") && typeof value === "function"
        const isStyleProp = key === "style"
        if (!(key in oldProps)) {
            // 추가
            if (isFuncProp) {
                const eventType = key.slice(2).toLowerCase()
                removeEvent(element, eventType, value)
                addEvent(element, eventType, value)
            } else if (isStyleProp) {
                Object.assign(element.style, value);
            } else {
                const classPropKey = key === "className" && 'class'
                element.setAttribute(classPropKey ? classPropKey : key, value)
            }

        } else {
            // 수정
            if (isFuncProp) {
                const eventType = key.slice(2).toLowerCase()
                addEvent(element, eventType, value)
            } else if (isStyleProp) {
                Object.assign(element.style, value);
            } else {
                const classPropKey = key === "className" && 'class'
                element.setAttribute(classPropKey ? classPropKey : key, value)
            }
        }
    });
};

const updateElement = (newNode, oldNode, parentElement, index = 0) => {
    // 1. 새 노드가 없고 기존 노드만 있으면 제거
    if (!newNode && oldNode) {
        parentElement.removeChild(parentElement.childNodes[index]);
        return;
    }

    // 2. 새 노드만 있을 경우 새 요소를 추가
    if (newNode && !oldNode ) {
        parentElement.appendChild(createElement__v2(newNode));
        return;
    }

    // 3. 텍스트 노드일 경우 텍스트 업데이트
    if (
        (typeof newNode === "number" || typeof newNode === "string") && (typeof oldNode === "number" || typeof oldNode === "string")
    ) {
        if (newNode !== oldNode) {
            return parentElement.replaceChild(createElement__v2(newNode), parentElement.childNodes[index]);
        }
        return;
    }

    // 4. 노드 타입이 다를 경우 노드를 교체
    if (newNode.type !== oldNode.type) {
        parentElement.replaceChild(createElement__v2(newNode), parentElement.childNodes[index]);
        return;
    }

    // 5. 같은 타입의 노드일 경우 속성 및 자식 노드를 업데이트

    // 5-1. 속성 업데이트
    updateAttributes(parentElement.childNodes[index], oldNode.props || {}, newNode.props || {});

    // 5-2. 자식 노드 재귀적 업데이트
    for (let i = 0; i < Math.max(newNode.children.length, oldNode.children.length); i++) {
        if (i <= newNode.children.length) {
            updateElement(newNode.children[i], oldNode.children[i], parentElement.childNodes[index], i);
        } else {
            // 5-3. 불필요한 자식 노드 제거
            parentElement.removeChild(parentElement.childNodes[index].lastChild);
        }
    }
};

export const renderElement = (vNode, container) => {
    // 최상위 수준의 렌더링 함수입니다.
    // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
    // - 최초 렌더링과 업데이트 렌더링 처리

    // 이벤트 위임 설정
    // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.

    if (container) {
        const oldNode = container.vNode
        const newNode = processVNode(vNode)

        if (!oldNode) {
            container.appendChild(createElement__v2(vNode))
        } else {
            updateElement(newNode, container.vNode, container)
        }

        container.vNode = newNode
        setupEventListeners(container)
    }
};