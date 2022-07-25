import { post } from "./api.js";
import {html,render} from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let registerTemplate = () => html`
    <section id="register-page" class="auth">
            <form id="register" @submit=${registerHandler}>
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>
`
const root = document.getElementById('main-content');
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