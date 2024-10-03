/** @jsx createVNode */
import{ createVNode } from "./lib";
import { NotFoundPage } from "./pages";
import { ErrorPage } from "./pages";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage;
    const isNotFoundPageShow = typeof PageComponent !== 'function'
    const error = globalStore.getState().error;

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            {
                !error ? 
                !isNotFoundPageShow ? <PageComponent /> : <NotFoundPage /> 
                : <ErrorPage />
            }
         </div>
    );
};