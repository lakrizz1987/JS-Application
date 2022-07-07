import { showContent, showHomePage } from "./controlPageView.js";

export async function login(e) {
    e.preventDefault();
    let form = document.getElementById('login-form');
    let data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');

    try {
        if(email == '' || password == ''){
            throw new Error('All fields are require!')
        }
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if(response.ok == false){
            let errData = await response.json()
            throw new Error(errData.message)
        }

        let data = await response.json();
        localStorage.setItem('user',JSON.stringify(data));
        document.querySelectorAll('.view-section').forEach(x => x.style.display = 'none');
        showContent(showHomePage())
    } catch (err) {
        alert(err.message)
    }


}