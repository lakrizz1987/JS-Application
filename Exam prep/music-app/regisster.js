import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { post } from "./api.js";

const registerTemplate = (registerHandler) => html`
    <section id="registerPage">
            <form @submit=${registerHandler}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`

const root = document.getElementById('main-content');
export const registerView = (ctx) =>{
    render(registerTemplate(registerHandler),root);
}

async function registerHandler(e){
    e.preventDefault();
    let form = new FormData(e.currentTarget)
    let {email,password} = Object.fromEntries(form);
    let repeatPassword = form.get('conf-pass')
    
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