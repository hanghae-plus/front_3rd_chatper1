import {Store} from "../../utils/store.js";

export const addLoginFormEvent = (router) => {
    const store = new Store()
    const form = document.getElementById('login-form')

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');

        if(!email) return alert('이메일을 입력해 주세요.')

        localStorage.setItem('user', JSON.stringify({name: 'testuser', email: '', bio: '',}));
        localStorage.setItem('isLogin','true')
        store.setState({isLogin:true, username:email})
        router.navigateTo('/profile')
    });
}