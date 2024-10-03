// renderElement.js

import {createElement__v2} from "./createElement__v2.js";
import {addEvent, removeEvent, setupEventListeners} from "./eventManager.js";
import {isTypeIn} from "../utils/isTypeIn.js";
import {isFalsyDom} from "../utils/isFalsyDom.js";

function processVNode(vNode) {
    if (isFalsyDom(vNode)) {
        return ""
    }

    if (typeof vNode === "number" || typeof vNode === "string") return vNode + "";

    if (typeof vNode?.type === "function") {
        return processVNode(vNode.type(vNode.props));
    }

    if (Array.isArray(vNode.children)) {
        vNode.children = vNode.children.map(processVNode);
    }

    return vNode;
}

function updateAttributes(domNode, newNode, oldNode) {

    const oldProps = oldNode.props ?? {};
    const newProps = newNode.props ?? {};

    Object.keys(oldProps ?? []).forEach(key => {
        if (isRemoved(newProps, key)) {
            domNode?.removeAttribute(key);
        }

        // TODO: 삭제, 추가, 변경시 이벤트는 별개로 처리해 주어야 한다.
        if (isChanged(oldProps, newProps, key)) {
            if (key.startsWith('on')) {
                removeEvent(domNode, key, oldProps[key]);
                addEvent(domNode, key, newProps[key]);
            } else if (key === "style") {
                updateOnlyChanged(domNode.style, oldProps[key], newProps[key]);
            } else if (key === "className") {
                domNode.className = newProps[key];
            } else {

            domNode.setAttribute(key, newProps[key]);
            }
        }

        if (isAdded(oldProps, newProps, key)) {
            domNode[key] = newProps[key];
        }
    });

}

function updateElement(domNode, newNode, oldNode, parent) {
    if (oldNode && !newNode) {
        domNode.remove()
        return;
    }

    if (newNode && !oldNode) {
        parent.appendChild(createElement__v2(newNode));
        return;
    }

    if (isTypeIn(typeof newNode, ['number', 'string']) && isTypeIn(typeof oldNode, ['number', 'string'])) {
        if (newNode !== oldNode) {
            domNode.textContent = newNode;

        }
        return;
    }

    if (newNode.type !== oldNode.type) {
        domNode.replaceWith(createElement__v2(newNode));
        return;
    }

    updateAttributes(domNode, newNode, oldNode);

    const oldChildren = oldNode?.children ?? [];
    const newChildren = newNode?.children ?? [];
    const max = Math.max(newChildren.length, oldChildren.length);

    for (let i = 0; i < max; i++) {
        updateElement(domNode.childNodes[i], newNode?.children?.[i], oldNode?.children?.[i], domNode);
    }

    if (newChildren.length < oldChildren.length) {
        for (let i = newChildren.length; i < oldChildren.length; i++) {
            domNode.childNodes[i].remove();
        }
    }
}

export function renderElement(vNode, container) {

    let newRoot = processVNode(vNode);
    const oldRoot = container.vNode;

    if (!oldRoot) {
        container.appendChild(createElement__v2(newRoot));
        setupEventListeners(container);
    } else {
        updateElement(container.childNodes[0], newRoot, oldRoot, container);
    }

    container.vNode = newRoot;

    setupEventListeners(container);
}

function updateOnlyChanged(origin, prev, next) {
    Object.keys(prev).forEach(key => {
        if (prev[key] !== next[key]) {
            origin[key] = next[key];
        }

        if (!next[key]) {
            origin[key] = undefined;
        }
    });

    Object.keys(next).forEach(key => {
        if (!prev[key]) {
            origin[key] = next[key];
        }
    });


}

function isChanged(prev, next, key) {
    return prev[key] !== next[key];
}

function isRemoved(next, key) {
    return !next[key];
}

function isAdded(prev, next, key) {
    return !prev[key];
}