// renderElement.js
import { createElement__v2 } from './createElement__v2';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';

//* vNode를 분석하여 랜더링 가능한 형태로 변환
function processVNode(vNode) {
    //? 1. vNode가 falsy일 경우 빈 텍스트 노드를 반환
    if (!vNode || typeof vNode === 'boolean') {
        return '';
    }

    //? 2. vNode가 문자열이나 숫자일 경우 텍스트 노드를 생성하여 반환
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return String(vNode);
    }

    //? 3. vNode의 type이 함수형인 경우, 컴포넌트를 호출하여 결과를 재귀적으로 처리
    if (typeof vNode.type === 'function') {
        const { type: component, props } = vNode;

        return processVNode(component(props));
    }

    //? 4. 자식 요소들에 대해 재귀적으로 processVNode 호출하여 변환
    const processedChildren = (vNode.children || []).map((child) => processVNode(child));

    //? 5. 렌더링 가능한 형태의 객체로 변환하여 반환
    return {
        type: vNode.type,
        props: vNode.props || {},
        children: processedChildren,
    };
}

//* DOM 요소의 속성을 업데이트
const updateAttributes = (oldElement, oldProps = {}, newProps = {}) => {
    const isEventProp = (key, value) => key.startsWith('on') && typeof value === 'function';
    const getEventType = (key) => key.slice(2).toLowerCase();

    const updateEvent = (key, newValue, oldValue) => {
        const eventType = getEventType(key);
        if (oldValue) removeEvent(oldElement, eventType, oldValue);
        if (newValue) addEvent(eventType, oldElement, newValue);
    };

    for (const key in newProps) {
        const newValue = newProps[key];
        const oldValue = oldProps[key];

        if (isEventProp(key, newValue)) {
            if (newValue !== oldValue) {
                updateEvent(key, newValue, oldValue);
            }
        } else if (key === 'className') {
            oldElement.setAttribute('class', newValue || '');
        } else if (key === 'style') {
            Object.assign(oldElement.style, newValue);
        } else {
            oldElement.setAttribute(key, newValue);
        }
    }

    for (const key in oldProps) {
        if (!(key in newProps)) {
            const oldValue = oldProps[key];
            if (isEventProp(key, oldValue)) {
                updateEvent(key, null, oldValue);
            } else {
                oldElement.removeAttribute(key);
            }
        }
    }
};

//* 두 VNode를 비교해 변경된 부분만 업데이트
const updateElement = (container, oldVNode, newVNode, index = 0) => {
    const currentElement = container.childNodes[index];

    if (!newVNode && oldVNode) {
        if (currentElement) container.removeChild(currentElement);
        return;
    }

    if (newVNode && !oldVNode) {
        const newElement = createElement__v2(newVNode);
        container.appendChild(newElement);
        return;
    }

    const isOldTextNode = typeof oldVNode === 'string' || typeof oldVNode === 'number';
    const isNewTextNode = typeof newVNode === 'string' || typeof newVNode === 'number';

    if (isOldTextNode && isNewTextNode && oldVNode !== newVNode) {
        const newTextElement = document.createTextNode(newVNode);
        container.replaceChild(newTextElement, currentElement);
        return;
    }

    if (newVNode.type !== oldVNode?.type) {
        const newElement = createElement__v2(newVNode);
        if (currentElement) {
            container.replaceChild(newElement, currentElement);
        } else {
            container.appendChild(newElement);
        }
        return;
    }

    if (!currentElement) return;

    updateAttributes(currentElement, oldVNode.props || {}, newVNode.props || {});

    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];
    const maxChildren = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxChildren; i++) {
        updateElement(currentElement, oldChildren[i], newChildren[i], i);
    }

    while (currentElement.childNodes.length > newChildren.length) {
        currentElement.removeChild(currentElement.lastChild);
    }
};

//* 최상위 수준의 렌더링 함수. 이전 vNode와 새로운 vNode를 비교하여 업데이트
export function renderElement(vNode, container) {
    const oldVNode = container?.oldVNode;
    const newVNode = processVNode(vNode);

    if (oldVNode) {
        updateElement(container, oldVNode, newVNode);
    } else {
        container.appendChild(createElement__v2(newVNode));
    }

    container.oldVNode = newVNode;

    setupEventListeners(container);
}
