/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
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

    localStorage.setItem("user", JSON.stringify(user));
    globalStore.setState({ currentUser: user, loggedIn: true });
    router.push("/profile");
}

function updateProfile() {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const bio = document.getElementById("bio");

    let user = {
        username: username.value,
        email: email.value,
        bio: bio.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    globalStore.setState({ currentUser: user, loggedIn: true });

    alert("수정되었습니다.");
}

function handleError(error) {
    globalStore.setState({ error });
}

// 초기화 함수
function render() {
    const $root = document.querySelector("#root");

    try {
        const $app = createElement(<App targetPage={router.getTarget()} />);

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

        console.error(error);

        // globalStore.setState({ error });
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

    addEvent("submit", "#profile-form", (e) => {
        e.preventDefault();
        updateProfile();
    });

    render();
}

main();
