import {$, setTpl} from "../utils/dom.js";
import {Logger} from "../utils/logger.js";

export const addGlobalErrorHandler = () => {
    const logger = new Logger()

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
        const {error} = event

        try{
            const {errorMessage,errorLog} = JSON.parse(error.message)
            setTpl(errorMessageTpl(errorMessage))($('#root'));
            logger.log(errorLog)
        }catch (e) {
            setTpl(errorMessageTpl('예기치 못한 에러가 발생했습니다.'))($('#root'));
            logger.log({
                type : 'error',
                location : 'addGlobalErrorHandler',
                message : 'error logs parse error'
            })
        }
    })
}