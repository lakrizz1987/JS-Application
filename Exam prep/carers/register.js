/*
import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";
*/
import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const registerTemplate = (registerHandler) => html`
        <!-- TEMPLATE HERE!! -->
        <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${registerHandler}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
      </section>
`
export const registerView = (ctx) =>{
    ctx.render(registerTemplate(registerHandler));

    async function registerHandler(e){
        e.preventDefault();
        let form = new FormData(e.currentTarget)
        let {email,password} = Object.fromEntries(form);
        let repeatPassword = form.get('re-password')
        
        if(!email || !password || !repeatPassword){
            alert('error')
            return
        }else{
            let user = await post('http://localhost:3030/users/register',{email,password});
            localStorage.setItem('user',JSON.stringify(user));
            e.target.reset();
            ctx.page.redirect('/dashboard');
        }
        
    }
}