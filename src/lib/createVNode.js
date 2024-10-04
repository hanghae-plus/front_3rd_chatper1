export function createVNode(type, props, ...children) {
	const flattenChildren = children.flat(Infinity).filter(Boolean);

	// Fragment는 props 에 children을 포함한다.
	if (typeof type === 'function' && type.name === 'Fragment') {
		return {
			type,
			props: {
				...(props || {}),
				children: flattenChildren,
			},
			children: flattenChildren,
		};
	}

	return { type, props, children: flattenChildren };
}
