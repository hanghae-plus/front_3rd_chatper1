/**
 * 가상 DOM 노드(vNode)를 실제 DOM 요소로 변환하는 함수.
 * @param {Object|string|number|null|undefined|boolean|Array} vNode - 변환할 가상 DOM 노드.
 * @returns {HTMLElement|DocumentFragment|Text} 생성된 DOM 요소.
 */
export function createElement(vNode) {
	// 1. 빈 텍스트 노드를 반환합니다.
	if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
		return document.createTextNode('');
	}

	// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환
	if (typeof vNode === 'string' || typeof vNode === 'number') {
		return document.createTextNode(String(vNode));
	}

	// 3. vNode가 배열, 즉 노드가 여러 개 이면 DocumentFragment를 생성하고 각 노드에 대해 createElement를 재귀 호출하여 추가한다.
	if (Array.isArray(vNode)) {
		const fragment = document.createDocumentFragment();
		vNode.forEach((child) => {
			const childElement = createElement(child);
			if (childElement) fragment.appendChild(childElement);
		});
		return fragment;
	}

	// 4. vNode.type이 함수, 즉 함수 컴포넌트이면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
	if (typeof vNode.type === 'function') {
		const component = vNode.type(vNode.props || {});
		return createElement(component);
	}

	// 5. vNode.type이 'fragment', 즉 Fragment 에 대한 처리, 자식 노드에 대해 createElement를 재귀 호출
	if (vNode.type === 'fragment') {
		return createElement(vNode.children);
	}

	// 6. 위 경우가 아니면 실제 DOM 요소를 생성
	// (1) vNode.type에 해당하는 요소를 생성
	const domElement = document.createElement(vNode.type);

	// (2) props 처리 (예: className, 이벤트 핸들러, 일반 속성)
	if (vNode.props) {
		Object.entries(vNode.props).forEach(([propName, propValue]) => {
			// 이벤트 핸들러 (onClick 등)
			if (propName.startsWith('on') && typeof propValue === 'function') {
				const eventType = propName.slice(2).toLowerCase();
				domElement.addEventListener(eventType, propValue);
			}
			// className 처리
			else if (propName === 'className') {
				domElement.className = propValue;
			}
			// 기타 속성 처리 (예: href, id, data-* 등)
			else {
				domElement.setAttribute(propName, propValue);
			}
		});
	}

	// (3) 자식 요소 처리
	if (vNode.children) {
		vNode.children.forEach((child) => {
			const childElement = createElement(child);
			if (childElement) {
				domElement.appendChild(childElement);
			} else {
				// 빈 텍스트 노드를 추가 (자식이 없을 때)
				domElement.appendChild(document.createTextNode(''));
			}
		});
	}

	return domElement;
}
