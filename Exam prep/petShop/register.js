import page from "./node_modules/page/page.mjs"
import { html, render } from "./node_modules/lit-html/lit-html.js"
import { post } from "./api.js";

const registerTemplate = () => html`
   <section id="registerPage">
            <form class="registerForm" @submit=${registerHandler}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>

` ;

let root = document.getElementById('content')

export const registerView = (ctx) =>{
    render(registerTemplate(),root);
}

async function registerHandler(e){
    e.preventDefault();
    
    let {email,password,repeatPassword} = Object.fromEntries(new FormData(e.currentTarget));
    
    if(!email || !password || !repeatPassword){
        alert('error')
        return
    }else{
        let user = await post('http://localhost:3030/users/register',{email,password});
        localStorage.setItem('user',JSON.stringify(user));
        e.target.reset();
        page.redirect('/');
    }
    
}