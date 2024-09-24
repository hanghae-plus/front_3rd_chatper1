import {Store} from "../../utils/store.js";

export const addUserInfoFormEvent = () => {
    const store = new Store()
    const state = store.getState()
    const form = document.getElementById('user-info-form')
    document.getElementById('username').value = state.username
    document.getElementById('email').value = state.email || ''
    document.getElementById('bio').value = state.bio || ''

    form.addEventListener('submit',(event) => {
        event.preventDefault()
        const formData = new FormData(form);
        const username = formData.get('username')
        const email = formData.get('email')
        const bio = formData.get('bio')

        localStorage.setItem('user' , JSON.stringify({username,email,bio}))
        store.setState({username,email,bio})
        alert('프로필이 업데이트되었습니다.')
    })
}