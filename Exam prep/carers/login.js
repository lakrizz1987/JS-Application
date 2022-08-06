/*
import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";
*/
import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const loginTemplate = (loginHandler) => html`
    <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${loginHandler}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
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
            ctx.page.redirect('/dashboard')
        }
    }
}