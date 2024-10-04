// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 as createElement } from './createElement__v2.js';

/**
 * vNode를 처리하여 렌더링 가능한 형태로 변환
 */
function processVNode(vNode) {
	// 1. null, undefined, boolean 값 처리
	if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
		return '';
	}

	// 2. 문자열과 숫자를 문자열로 변환
	if (typeof vNode === 'string' || typeof vNode === 'number') {
		return String(vNode);
	}

	// 3. 배열 처리
	if (Array.isArray(vNode)) {
		return vNode.map((child) => processVNode(child));
	}

	// 4. 함수형 컴포넌트 처리
	if (typeof vNode.type === 'function') {
		const component = vNode.type(vNode.props || {});
		return processVNode(component);
	}

	// 5. 자식 요소들에 대해 재귀적으로 processVNode 호출
	return {
		...vNode,
		children: vNode.children.map(processVNode),
	};
}

/**
 * DOM 요소의 속성을 업데이트하는 함수
 */
function updateAttributes(target, newProps, oldProps) {
	// 1. 새로운 속성을 추가 or 업데이트 한다
	for (const [newAttr, newValue] of Object.entries(newProps)) {
		if (oldProps[newAttr] === newValue) continue;

		// 속성의 변화가 있을 때 업데이트 한다
		// - 이벤트 리스너 처리
		if (newAttr.startsWith('on') && typeof newValue === 'function') {
			const eventType = newAttr.slice(2).toLowerCase();
			addEvent(target, eventType, newValue);
		}
		// - className
		else if (newAttr === 'className') {
			target.setAttribute('class', newValue || '');
		}
		// - 일반 속성
		else {
			target.setAttribute(newAttr, newValue);
		}
	}

	// 2.
	for (const [oldAttr, oldValue] of Object.entries(oldProps)) {
		if (newProps[oldAttr] !== undefined) continue;

		if (oldAttr.startsWith('on') && typeof oldValue === 'function') {
			const eventType = oldAttr.slice(2).toLowerCase();
			removeEvent(target, eventType); // 기존 핸들러 제거
		} else {
			target.removeAttribute(oldAttr);
		}
	}
}

/**
 * Dom 을 업데이트하는 함수
 */
function updateElement(parent, newNode, oldNode, index = 0) {
	if (!newNode && !oldNode) return;

	// 2. 새로 추가된 노드인 경우 parent 에 삽입한다.
	if (newNode && !oldNode) return parent.appendChild(createElement(newNode));

	// 삭제 혹은 업데이트 될 target element 정의
	const target = parent.childNodes[index];

	// 3. 삭제되는 노드의 경우 parent 에서 제거한다
	if (!newNode && oldNode) return parent.removeChild(target);

	// 4. 텍스트 노드의 경우, 내용이 다를 경우에만 업데이트 한다.
	if (typeof newNode === 'string' && typeof oldNode === 'string') {
		if (newNode === oldNode) return;
		return parent.replaceChild(createElement(newNode), target);
	}

	// 5. 새로운 노드가 기존의 노드와 다른 타입의 노드라면 대체한다.
	if (
		newNode.type !== oldNode.type ||
		(Array.isArray(newNode) && !Array.isArray(oldNode)) ||
		(!Array.isArray(newNode) && Array.isArray(oldNode))
	) {
		return parent.replaceChild(createElement(newNode), target);
	}

	// 6. 새로운 노드와 기존의 노드가 둘다 배열인 경우, 요소 하나씩 비교하여 재귀적으로 업데이트 한다.
	if (Array.isArray(newNode) && Array.isArray(oldNode)) {
		// 최대 길이를 기준으로 반복하며 업데이트
		const maxLength = Math.max(newNode.length, oldNode.length);
		for (let i = 0; i < maxLength; i++) {
			updateElement(parent, newNode[i], oldNode[i]);
		}
		return;
	}

	// 7. 나머지의 경우(같은 타입의 노드) 속성과 자식 노드를 업데이트 한다
	// 5-1. 속성 업데이트
	updateAttributes(target, newNode.props || {}, oldNode.props || {});

	// 5-2. 자식 노드 재귀적 업데이트
	const maxLength = Math.max(newNode.children.length, oldNode.children.length);
	// 최대 자식 수를 기준으로 루프를 돌며 업데이트
	for (let i = 0; i < maxLength; i++) {
		updateElement(target, newNode.children[i], oldNode.children[i], i);
	}
}

/**
 * 최상위 수준의 렌더링 함수
 * - 이전 vNode와 새로운 vNode를 비교하여 업데이트
 * - 이벤트 위임 설정
 */
export function renderElement(vNode, container) {
	// 이전 vNode와 새로운 vNode를 정의
	const newNode = processVNode(vNode);
	const oldNode = container._vNode;

	// 이전 vNode와 새로운 vNode를 비교하여 업데이트
	updateElement(container, newNode, oldNode);

	// 새로운 vNode로 업데이트
	container._vNode = newNode;

	// 이벤트 위임 설정
	setupEventListeners(container);
}
