import { addEvent, removeEvent } from "../lib";

export const camelToKebab = (str) => {
	return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

export const handleUpdateAttributes = (type, $element, key, value) => {
	if (key.startsWith("on")) {
		const eventType = key.toLowerCase().substring(2);

		if (type === "remove" || type === "update") removeEvent($element, eventType, value);
		if (type === "add" || type === "update") addEvent($element, eventType, value);
		return;
	}

	let newKey = key;
	let newValue = value;

	if (key === "className") {
		newKey = "class";
	} else if (key === "style" && type !== "remove") {
		newValue = Object.entries(value)
			.map(([k, v]) => `${camelToKebab(k)}: ${v}`)
			.join("; ");
	}

	// setAttribute를 사용하면 동일한 key가 있을 경우 덮어씌워지기 때문에 removeAttribute 사용할 필요 없음
	if (type === "add" || type === "update") $element.setAttribute(newKey, newValue);
	else if (type === "remove") $element.removeAttribute(newKey);
};
