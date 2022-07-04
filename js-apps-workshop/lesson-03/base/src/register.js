window.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', onClickRegister);
})

async function onClickRegister(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get('email').trim();
    let password = form.get('password').trim();
    let repass = form.get('rePass').trim();

    try{
        if(password != repass){
            throw new Error('Password not match');
        }

        let res = await fetch('http://localhost:3030/users/register',{
            method:'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({email,password})
        })
        let data = await res.json();
        localStorage.setItem('token', data.accessToken);
        window.location = '/index.html';
    }catch(err){
        alert(err.message)
    }
   
}