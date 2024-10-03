/** @jsx createVNode */
import{ createVNode } from "./lib";
import { globalStore } from "./stores";
import { NotFoundPage } from "./pages";

export const App = ({ targetPage }) => {

    const PageComponent = targetPage ?? NotFoundPage;
    const error = globalStore.getState().error;

    return (
        <div>
            <PageComponent />
            
      </div>
    )

};
