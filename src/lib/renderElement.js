import { createElement__v2 } from "./createElement__v2.js";
import { setupEventListeners } from './eventManager';

function processVNode(vNode) {
    if (!vNode) return document.createTextNode('');
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return document.createTextNode(String(vNode));
    }
    if (Array.isArray(vNode)) {
        const fragment = document.createDocumentFragment();
        vNode.forEach(child => fragment.appendChild(processVNode(child)));
        return fragment;
    }
    const element = document.createElement(vNode.type);
    applyProps(element, vNode.props);
    vNode.children.map(child => processVNode(child)).forEach(childElement => element.appendChild(childElement));
    return element;
}

function applyProps(element, props, oldProps = {}) {
    Object.keys({...props, ...oldProps}).forEach(key => {
        const newVal = props[key];
        const oldVal = oldProps[key];
        if (newVal !== oldVal) {
            if (key.startsWith('on')) {
                const eventType = key.slice(2).toLowerCase();
                if (oldVal) element.removeEventListener(eventType, oldVal);
                if (newVal) element.addEventListener(eventType, newVal);
            } else if (newVal == null) {
                element.removeAttribute(key);
            } else {
                element.setAttribute(key, newVal);
            }
        }
    });
}

function updateElement(parent, newNode, oldNode = {}, index = 0) {
    if (!oldNode && newNode) {
        parent.appendChild(createElement__v2(newNode));
    } else if (!newNode) {
        if (parent.childNodes[index]) parent.removeChild(parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    } else if (newNode.type) {
        updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);
        const maxLength = Math.max(newNode.children.length, oldNode.children.length);
        for (let i = 0; i < maxLength; i++) {
            updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
        while (parent.childNodes[index].childNodes.length > maxLength) {
            parent.childNodes[index].removeChild(parent.childNodes[index].lastChild);
        }
    }
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

export function renderElement(vNode, container) {
    updateElement(container, vNode, container.firstChild ? container.firstChild.vNode : null);
    container.vNode = vNode; 
    setupEventListeners(container);
}
