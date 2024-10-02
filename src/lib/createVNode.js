export const createVNode = (type, props, ...children) => {
	const flatChildren = children.flat(Infinity).filter(Boolean);
	return { type, props, children: flatChildren };
};
