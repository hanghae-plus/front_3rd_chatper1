/** @jsx createVNode */
import { createVNode } from "./lib";
import { NotFoundPage } from "./pages";

export const App = ({ targetPage }) => {
    const PageComponent = targetPage ?? NotFoundPage;
    return <div>{PageComponent()}</div>;
};
