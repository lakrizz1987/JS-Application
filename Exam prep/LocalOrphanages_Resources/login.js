import { post } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let loginTemplate = () => html`
    <section id="login-page" class="auth">
        <form id="login" @submit="${loginHandler}">
            <h1 class="title">Login</h1>
    
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>
`
const root = document.getElementById('main-content');
export const loginView = (ctx) => {
    render(loginTemplate(), root);
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