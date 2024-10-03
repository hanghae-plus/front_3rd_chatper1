/** @jsx createVNode */
/** @jsxFrag Fragment */
import { createVNode } from './lib';
import { Fragment } from './components';
import { globalStore } from './stores';
import { NotFoundPage } from './pages';

export const App = ({ targetPage }) => {
	const PageComponent = targetPage ?? NotFoundPage;
	const error = globalStore.getState().error;

	return (
		<>
			<PageComponent />
			{error && (
				<div
					id="error-boundary"
					class="fixed bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-75"
					role="alert"
				>
					<div class="flex justify-between items-center">
						<div>
							<strong class="font-bold">오류 발생!</strong>
							<span class="block sm:inline ml-1">
								${error.message || '알 수 없는 오류가 발생했습니다.'}
							</span>
						</div>
						<button class="text-red-700 hover:text-red-900 font-semibold">
							&times;
						</button>
					</div>
				</div>
			)}
		</>
	);
};
