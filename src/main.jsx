/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const router = createRouter({
    "/": HomePage,
    "/login": () => {
        const { loggedIn } = globalStore.getState();
        if (loggedIn) {
            throw new ForbiddenError();
        }
        return <LoginPage />;
    },
    "/profile": () => {
        const { loggedIn } = globalStore.getState();
        if (!loggedIn) {
            throw new UnauthorizedError();
        }
        return <ProfilePage />;
    },
});

function logout() {
    localStorage.removeItem("user");
    globalStore.setState({ currentUser: null, loggedIn: false });
    router.push("/login");
    userStorage.reset();
}

function login() {
    const username = document.getElementById("username");

    let user = {
        username: username.value,
        email: "",
        bio: "",
    };

    try {
        localStorage.setItem("user", JSON.stringify(user));
        globalStore.setState({ currentUser: user, loggedIn: true });
        router.push("/profile");
    } catch (error) {
        globalStore.setState({ error });
    }
}

function handleError(error) {
    globalStore.setState({ error });
}

// 초기화 함수
function render() {
    const $root = document.querySelector("#root");
    const eventDelegator = initializeEventDelegator(); // 이벤트 위임 관리 객체 생성
    const targetPage = router.getTarget();

    try {
        const $app = createElement(targetPage ? <App targetPage={router.getTarget()} /> : <NotFoundPage />);

        if ($root.hasChildNodes()) {
            $root.firstChild.replaceWith($app);
        } else {
            $root.appendChild($app);
        }
    } catch (error) {
        if (error instanceof ForbiddenError) {
            router.push("/");
            return;
        }

        if (error instanceof UnauthorizedError) {
            router.push("/login");
            return;
        }

        globalStore.setState({ error });
    }

    registerGlobalEvents();
}

function main() {
    router.subscribe(render);
    globalStore.subscribe(render);
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    addEvent("click", "[data-link]", (e) => {
        e.preventDefault();
        router.push(e.target.href.replace(window.location.origin, ""));
    });

    addEvent("click", "#logout", (e) => {
        e.preventDefault();
        logout();
    });

    addEvent("click", "#error-boundary", (e) => {
        e.preventDefault();
        globalStore.setState({ error: null });
    });

    addEvent("submit", "#login-form", (e) => {
        e.preventDefault();
        login();
    });

    render();
}

main();
