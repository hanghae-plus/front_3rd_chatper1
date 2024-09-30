/** @jsx createVNode */
import{ createVNode } from "./lib";
import { NotFoundPage } from "./pages";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage;
    const isNotFoundPageShow = typeof PageComponent !== 'function'

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            {!isNotFoundPageShow ? <PageComponent/> : <NotFoundPage/>}
        </div>
    );
};