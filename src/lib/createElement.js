import { camelToKebab } from "../utils";

export const createElement = (vNode) => {
	if (vNode === undefined || vNode === null || vNode === "" || typeof vNode === "boolean")
		return document.createTextNode("");
	if (typeof vNode === "string" || typeof vNode === "number") return document.createTextNode(vNode);
	if (Array.isArray(vNode)) {
		const $fragment = document.createDocumentFragment();
		vNode.forEach((child) => {
			$fragment.appendChild(createElement(child));
		});
		return $fragment;
	}
	if (typeof vNode.type === "function") {
		return createElement(vNode.type(vNode.props));
	}

	const $el = document.createElement(vNode.type);
	Object.entries(vNode.props || {}).forEach(([key, value]) => {
		if (key.startsWith("on")) {
			const event = key.toLowerCase().substring(2);
			$el.addEventListener(event, value);
		} else if (key === "className") {
			$el.setAttribute("class", value);
		} else if (key === "style") {
			const formattedStyle = Object.entries(value)
				.map(([k, v]) => `${camelToKebab(k)}: ${v}`)
				.join("; ");
			$el.setAttribute(key, formattedStyle);
		} else {
			$el.setAttribute(key, value);
		}
	});
	vNode.children.forEach((child) => {
		$el.appendChild(createElement(child));
	});
	return $el;
};
