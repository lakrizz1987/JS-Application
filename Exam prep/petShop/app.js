import page from "./node_modules/page/page.mjs"
import { html, render } from "./node_modules/lit-html/lit-html.js"
import { homeView } from "./home.js"
import { dashView } from "./dashboard.js"
import { loginView } from "./login.js";
import { registerView } from "./register.js";
import { createView } from "./create.js";
import { editView } from "./edit.js";
import { detailsView } from "./details.js";
import { get } from "./api.js";
import { navView } from "./navControl.js";

page(navView)
page('/',homeView);
page('/dashboard',dashView);
page('/login',loginView);
page('/register',registerView);
page('/create',createView);
page('/edit/:id',editView);
page('/details/:id',detailsView);

page.start();


document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/')
}