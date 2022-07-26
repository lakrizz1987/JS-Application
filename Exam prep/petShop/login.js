import page from "./node_modules/page/page.mjs"
import { html, render } from "./node_modules/lit-html/lit-html.js"
import { post } from "./api.js";

const loginTemplate = () => html`
 <section id="loginPage">
            <form class="loginForm" @submit=${loginHandler}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
` ;

let root = document.getElementById('content')

export const loginView = (ctx) =>{
    render(loginTemplate(),root);
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