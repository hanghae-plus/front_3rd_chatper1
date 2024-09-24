import {Store} from "../../utils/store.js";

export const addLoginFormEvent = (router) => {
    const store = new Store()
    const form = document.getElementById('login-form')

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        if(!email) return alert('이메일을 입력해 주세요.')
        if(!password) return alert('비밀번호를 입력해 주세요.')

        localStorage.setItem('isLogin','true')
        localStorage.setItem('user',JSON.stringify({name:email,email:"",bio:""}))
        store.setState({isLogin:true, username:email})
        router.navigateTo('/profile')
    });
}