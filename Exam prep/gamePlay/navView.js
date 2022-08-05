import {html, render} from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get } from "./api.js";


const headRoot = document.querySelector('#box header');

const navTemplate = (user) => html`
     <h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/allgames">All games</a>
                <!-- Logged-in users -->
                ${user ? html`<div id="user">
                    <a href="/create">Create Game</a>
                    <a id="logoutBtn" href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
                </div>`:html`<div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`}
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