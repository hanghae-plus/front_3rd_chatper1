/** @jsx createVNode */
import { createVNode } from './lib';
import { NotFoundPage } from './pages/NotFoundPage';
import { globalStore } from './stores';

export const App = ({ targetPage }) => {
    const PageComponent = targetPage ?? NotFoundPage;
    const error = globalStore.getState().error;

    return (
        <div>
            {error === null ? (
                <PageComponent />
            ) : (
                <div className='flex justify-center bg-gray-100 min-h-screen'>
                    <div className='max-w-md w-full'>
                        <aside id='error-boundary' class='w-full p-8'>
                            <h2 class='text-red-600 text-center'>오류 발생!</h2>
                            <p class='text-center'>${error.message}</p>
                        </aside>
                    </div>
                </div>
            )}
        </div>
    );
};
