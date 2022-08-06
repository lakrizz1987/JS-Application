/*
import {html, render} from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get } from "./api.js";
*/
import { get } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

const headRoot = document.querySelector('#wrapper header');

const navTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>

<nav>
    <div>
        <a href="/dashboard">Dashboard</a>
    </div>

    <!-- Logged-in users -->
    ${user ? html`<div class="user">
        <a href="/create">Create Offer</a>
        <a href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
    </div>` :
    html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
}
    

    <!-- Guest users -->
    
</nav>
`
export function navView(ctx, next) {
    let user = JSON.parse(localStorage.getItem('user'));
    render(navTemplate(user), headRoot);
    next();
}

async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/')
}