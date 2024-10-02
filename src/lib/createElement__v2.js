import { handleUpdateAttributes } from "../utils";

export const createElement__v2 = (vNode) => {
	if (vNode === undefined || vNode === null || vNode === "" || typeof vNode === "boolean")
		return document.createTextNode("");
	if (typeof vNode === "string" || typeof vNode === "number") return document.createTextNode(vNode);
	if (Array.isArray(vNode)) {
		const $fragment = document.createDocumentFragment();
		vNode.forEach((child) => {
			$fragment.appendChild(createElement__v2(child));
		});
		return $fragment;
	}
	if (typeof vNode.type === "function") {
		return createElement__v2(vNode.type(vNode.props));
	}
	const $el = document.createElement(vNode.type);
	Object.entries(vNode.props || {}).forEach(([key, value]) => {
		handleUpdateAttributes("add", $el, key, value);
	});
	vNode.children.forEach((child) => {
		$el.appendChild(createElement__v2(child));
	});
	return $el;
};
