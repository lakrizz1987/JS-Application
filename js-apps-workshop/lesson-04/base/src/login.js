import { navButtonsRouter } from "./navBtnRouter.js";

let sectionLogin = document.querySelector('#login');

export function loginView() {
    sectionLogin.style.display = 'block';
}

let form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let user = new FormData(e.currentTarget);
    let email = user.get('email');
    let password = user.get('password');
    
    try {
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if (response.ok == false) {
            let dataError = await response.json();
            throw new Error(dataError.message);
        }

        let data = await response.json();
        localStorage.setItem('user',JSON.stringify(data));
        navButtonsRouter();
        Array.from(document.querySelectorAll('section')).forEach(x => x.style.display = 'none')
        document.querySelector('#catalog').style.display = 'block';
    } catch (err) {
        alert(err.message)
    }

    
});


