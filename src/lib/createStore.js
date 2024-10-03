import { createObserver } from "./";

export const createStore = (initialStore) => {
	const { subscribe, notify } = createObserver();

	let state = { ...initialStore };

	const setState = (newState) => {
		state = { ...state, ...newState };
		notify();
	};

	const getState = () => ({ ...state });

	return { getState, setState, subscribe };
};
