export function handleNavElemClicked(e) {
    console.log(e.target.tagName);
    if (e.target.tagName === 'A') {
        e.preventDefault();
        e.stopPropagation();
        console.log('e.target.pathname: ', e.target.pathname);

        goTo(e.target.pathname);
    }
}

export const setNavElemTapped = () => {
    console.log('setNavElemTapped!');
    const navElem = document.querySelector('nav');

    if (navElem) {
        navElem.addEventListener('click', handleNavElemClicked);
    }
};

export const goTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};
