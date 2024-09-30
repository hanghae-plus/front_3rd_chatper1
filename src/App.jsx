/** @jsx createVNode */
import{ createVNode } from "./lib";
import { NotFoundPage } from "./pages/NotFoundPage";
import { globalStore } from "./stores";
import { Footer, Header } from "./components";
import { HomePage, ProfilePage } from "./pages";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage;
    const error = globalStore.getState().error;

    const isComponentShow = targetPage === HomePage || targetPage === ProfilePage;

    return (
        <div>
            {isComponentShow ? <Header /> : null}
            {!error ? <PageComponent /> : <NotFoundPage />}
            {isComponentShow ? <Footer /> : null}
        </div>
    );
};