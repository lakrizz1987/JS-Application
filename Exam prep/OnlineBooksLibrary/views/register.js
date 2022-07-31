import { html} from "../node_modules/lit-html/lit-html.js";
import { post } from "../src/api.js";

const registerTemplate = (registerHandler) => html`
      <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit=${registerHandler}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>
`

export const registerView = (ctx) =>{
    ctx.render(registerTemplate(registerHandler));

    async function registerHandler(e){
        e.preventDefault();
        let form = new FormData(e.currentTarget)
        let {email,password} = Object.fromEntries(form);
        let repeatPassword = form.get('confirm-pass')
        
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

