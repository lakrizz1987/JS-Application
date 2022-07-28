import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { post } from "./api.js";

const loginTemplate = (loginHandler) => html`
    <section id="loginPage" >
        <form @submit=${loginHandler}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`

const root = document.getElementById('main-content');
export const loginView = (ctx) => {
    render(loginTemplate(loginHandler), root);
}

async function loginHandler(e) {
    e.preventDefault();

    let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    if (!email || !password ) {
        alert('error')
        return
    } else {
        let user = await post('http://localhost:3030/users/login', { email, password });
        localStorage.setItem('user', JSON.stringify(user))
        page.redirect('/')
    }
}