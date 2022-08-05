import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const loginTemplate = (loginHandler) => html`
   <section id="login-page" class="auth">
            <form id="login" @submit=${loginHandler}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`

export const loginView = (ctx) => {
    ctx.render(loginTemplate(loginHandler));

    async function loginHandler(e) {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (!email || !password) {
            alert('error')
            return
        } else {
            let user = await post('http://localhost:3030/users/login', { email, password });
            localStorage.setItem('user', JSON.stringify(user))
            ctx.page.redirect('/')
        }
    }
}