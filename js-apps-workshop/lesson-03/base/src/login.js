window.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', onClickLogin)
})

async function onClickLogin(ev) {
    ev.preventDefault();

    let url = 'http://localhost:3030/users/login';
    let form = new FormData(ev.target);
    let email = form.get('email');
    let password = form.get('password');

    try{
        let res = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if(res.ok != true){
            throw new Error('Wrong username ot password')
        }

        let data = await res.json();
       
        localStorage.setItem('token', data.accessToken);
        window.location = '/index.html';
    }catch(err){
        alert(err.message)
    }
    
}