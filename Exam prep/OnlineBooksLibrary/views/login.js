import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../src/api.js";

const loginTemplate = (loginHandler) => html`
    <section id="login-page" class="login">
        <form id="login-form" action="" method="" @submit=${loginHandler}>
            <fieldset>
                <legend>Login Form</legend>
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
                <input class="button submit" type="submit" value="Login">
            </fieldset>
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

