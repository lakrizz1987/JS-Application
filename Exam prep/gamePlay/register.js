import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const registerTemplate = (registerHandler) => html`
        <section id="register-page" class="content auth">
            <form id="register" @submit=${registerHandler}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`
export const registerView = (ctx) =>{
    ctx.render(registerTemplate(registerHandler));

    async function registerHandler(e){
        e.preventDefault();
        let form = new FormData(e.currentTarget)
        let {email,password} = Object.fromEntries(form);
        let repeatPassword = form.get('confirm-password')
        
        if(!email || !password || !repeatPassword){
            alert('error')
            return
        }else{
            let user = await post('http://localhost:3030/users/register',{email,password});
            localStorage.setItem('user',JSON.stringify(user));
            e.target.reset();
            ctx.page.redirect('/');
        }
        
    }
}