import {Store} from "../../utils/store.js";
import {Logger} from "../../utils/logger.js";

export const addLoginFormEvent = (router) => {
    const store = new Store()
    const logger = new Logger()
    const form = document.getElementById('login-form')

    form.addEventListener('submit',(event) => {
        try{
            event.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email');

            if(!email) return alert('이메일을 입력해 주세요.')
            if(email === '1') throw (JSON.stringify({
                errorMessage : '에러가 발생 했습니다.',
                errorLog : {
                    type : 'error',
                    location : 'addLoginFormEvent',
                    message: 'fail login event',
                }
            }))

            localStorage.setItem('user', JSON.stringify({username: email, email: '', bio: '',}));
            localStorage.setItem('isLogin','true')
            store.setState({isLogin:true, username:email})
            logger.log({
                type : 'event',
                location : 'addLoginFormEvent',
                message : 'success login event'
            })
            router.navigateTo('/profile')
        }catch (errorMessage) {
            throw new Error(errorMessage)
        }
    });
}

export const getUserInfoFromStorage = () => {
    const logger = new Logger()

    let userInfo

    try{
       userInfo = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
        alert('예기치 못한 오류가 발생했습니다.')
        localStorage.removeItem('user')
        logger.log({type:'error', location : 'getUserInfoFromStorage', message : 'user storage parse error'})
    }

    return userInfo
}