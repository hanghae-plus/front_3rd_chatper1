// TODO: createElement 함수 구현

//* createElement: 가상 노드를 파라미터로 받아온 뒤 실제 DOM 노드를 생성하고 반환하는 함수
export function createElement(vNode) {
    //? 1. vNode가 falsy면 빈 텍스트 노드를 반환
    if (!vNode) {
        return document.createTextNode('');
    }

    //? 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return document.createTextNode(vNode);
    }

    //? 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가
    if (Array.isArray(vNode) === true) {
        const fragment = document.createDocumentFragment();
        vNode.forEach((child) => fragment.appendChild(createElement(child)));
        return fragment;
    }

    //? 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
    if (typeof vNode.type === 'function') {
        return createElement(vNode.type(vNode.props, vNode.children));
    }

    //? 5. 위 경우가 아니면 실제 DOM 요소를 생성

    //? 1)vNode.type에 해당하는 요소를 생성
    const element = document.createElement(vNode.type);

    //? 2) vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
    setElementProperties(element, vNode.props);

    //? 3) vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
    vNode.children.forEach((child) => {
        element.appendChild(createElement(child));
    });

    return element;
}

function setElementProperties(element, props) {
    if (!props || typeof props !== 'object') return;

    for (const [key, value] of Object.entries(props)) {
        switch (true) {
            case key.startsWith('on') && typeof value === 'function': {
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, value);
                break;
            }
            case key === 'className': {
                if (typeof value === 'string') {
                    element.classList.add(...value.split(' '));
                }
                break;
            }
            case key === 'style' && typeof value === 'object': {
                for (const [styleKey, styleValue] of Object.entries(value)) {
                    element.style[styleKey] = styleValue;
                }
                break;
            }
            case key in element: {
                element[key] = value;
                break;
            }
            default: {
                element.setAttribute(key, value);
                break;
            }
        }
    }
}
