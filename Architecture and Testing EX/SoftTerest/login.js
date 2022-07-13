import { post } from "./api.js";
import { showHome } from "./home.js";

let sectionLogin = document.getElementById('loginPage');
let form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let data = new FormData(form);

    let email = data.get('email')
    let password = data.get('password');

    let user = await post('http://localhost:3030/users/login', { email, password });
    let userData = JSON.stringify(user)
    localStorage.setItem('user', userData);

    let main = document.querySelector('main');
    main.replaceChildren()

    showHome(main)
});

export function showLogin(section) {
    section.replaceChildren(sectionLogin);
}

