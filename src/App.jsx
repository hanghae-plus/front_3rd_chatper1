/** @jsx createVNode */
import { renderElement, createVNode } from "./lib";
import { NotFoundPage } from "./pages";
import { ErrorPage } from "./pages/ErrorPage";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage ?? NotFoundPage;
    const error = globalStore.getState().error;

    return (
        <div>
            <PageComponent />
            {error ? <ErrorPage message={error.message} /> : ""}
        </div>
    );
};
