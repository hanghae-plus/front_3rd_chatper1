import { Fragment } from '../components';

export function createVNode(type, props, ...children) {
	const flattenChildren = children.flat(Infinity).filter(Boolean);

	// frament 에 대해서는 props 에 children을 포함한다.
	if (type === Fragment) {
		return {
			type,
			props: {
				...(props || {}),
				children: flattenChildren,
			},
		};
	}

	return { type, props, children: flattenChildren };
}
