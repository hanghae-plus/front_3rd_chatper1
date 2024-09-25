import {$, setTpl} from "../utils/dom.js";

export const addGlobalErrorHandler = () => {
    const errorMessageTpl = (errorMessage) => {
        return `
            <main class="min-h-screen flex justify-center">
                <div class="flex flex-col items-center justify-center">
                    <p class="text-red-600">${errorMessage}</p>
                    <p>오류 발생!</p>
                    <p>의도적인 오류입니다.</p>
                </div>
            </main>
        `
    }


    window.addEventListener('error', (event) => {
        const {message} = event
        setTpl(errorMessageTpl(message))($('#root'));
    })
}