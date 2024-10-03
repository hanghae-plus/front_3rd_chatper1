import { addEvent } from './eventManager';

//* createElement__v2: createElement에서 이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선한 버전
export function createElement__v2(vNode) {
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
        return createElement__v2(vNode.type(vNode.props, vNode.children));
    }

    //? 5. 위 경우가 아니면 실제 DOM 요소를 생성

    //? 1)vNode.type에 해당하는 요소를 생성
    const element = document.createElement(vNode.type);

    //? 2) vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
    Object.entries(vNode.props || {}).forEach(([key, value]) => {
        applyProperty(element, key, value);
    });

    //? 3) vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
    vNode.children.forEach((child) => {
        element.appendChild(createElement__v2(child));
    });

    return element;
}

function applyProperty(element, key, value) {
    switch (true) {
        case key.startsWith('on') && typeof value === 'function': {
            const eventType = key.slice(2).toLowerCase();
            addEvent(eventType, element, value);
            break;
        }
        case key === 'className': {
            element.setAttribute('class', value || '');
            break;
        }
        case key === 'style' && typeof value === 'object': {
            for (const [styleKey, styleValue] of Object.entries(value)) {
                if (typeof styleKey === 'string' && styleValue !== undefined && styleValue !== null) {
                    element.style[styleKey] = String(styleValue);
                }
            }
            break;
        }
        default: {
            element.setAttribute(key, value);
            break;
        }
    }
}
