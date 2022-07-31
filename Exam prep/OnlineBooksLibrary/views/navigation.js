import {html, render} from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get } from "../src/api.js";

const headRoot = document.getElementById('site-header');

const navTemplate = (user) => html`
    <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    <!-- Guest users -->
                    ${user ? html` 
                    <div id="user">
                        <span>Welcome, ${user.email}</span>
                        <a class="button" href="/mybooks">My Books</a>
                        <a class="button" href="/add">Add Book</a>
                        <a class="button" id="logoutBtn" href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
                    </div>
                    `: html`
                    <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>
                    `}
                </section>
            </nav>
`  
export function navView(ctx,next){
    let user = JSON.parse(localStorage.getItem('user'));
    render(navTemplate(user),headRoot);
    next()
}

async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/')
}