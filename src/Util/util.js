export const handleNavElemClicked = (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        e.stopPropagation();
        goTo(e.target.pathname);
    }
};

export const setNavElemTapped = () => {
    const navElem = document.querySelector('nav');

    if (navElem) {
        navElem.addEventListener('click', handleNavElemClicked);
    }
};

export const goTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};
