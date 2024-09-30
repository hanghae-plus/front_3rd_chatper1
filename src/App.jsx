/** @jsx createVNode */
import{ createVNode } from "./lib";
import { NotFoundPage } from "./pages/NotFoundPage";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage;
    const error = globalStore.getState().error;

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            {!error && PageComponent? <PageComponent/>  : <NotFoundPage />}
        </div>
    );
};