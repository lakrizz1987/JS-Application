import { post } from "./api.js";
import { showHome } from "./home.js";
import { navContorl } from "./navControl.js";

let sectionRegister = document.getElementById('registerPage');

export function showRegister(section){
    section.replaceChildren(sectionRegister);
}

let form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let data = new FormData(form);

    let email = data.get('email')
    let password = data.get('password');

    let user = await post('http://localhost:3030/users/register', { email, password });
    let userData = JSON.stringify(user)
    localStorage.setItem('user', userData);
    form.reset() 
    let main = document.querySelector('main');
    main.replaceChildren()

    showHome(main)
    navContorl()
});