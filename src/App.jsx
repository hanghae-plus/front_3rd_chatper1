/** @jsx createVNode */
import{ createVNode } from "./lib";
import { NotFoundPage } from "./pages/NotFoundPage";
import { globalStore } from "./stores";

import { HomePage, ProfilePage } from "./pages";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage;
    const error = globalStore.getState().error;

    const isComponentShow = targetPage === HomePage || targetPage === ProfilePage;

    return (
        <div class="bg-gray-100 min-h-screen flex justify-center">
            {!error ? <PageComponent isComponentShow={isComponentShow}/> : <NotFoundPage />}
        </div>
    );
};