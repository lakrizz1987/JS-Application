import { get } from "./api.js";
import { html,render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";



let rootNav = document.getElementById('headNav');


let template = (user) => html`
    <nav>
                <img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    ${user ? html`
                    <li><a href="/create">Create Album</a></li>
                    <li><a id="logoutBtn" href="javascript:void(0)" @click=${logoutHandler}>Logout</a></li>
                    `: html `
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    `}
                </ul>
            </nav>
`

export const navView = (ctx, next) => {
    let user = JSON.parse(localStorage.getItem('user'));
    render(template(user),rootNav)
   
    next();
};



async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/')
}