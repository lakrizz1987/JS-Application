import {html,render} from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

import { loginView } from "./login.js";
import { registerView } from "./register.js";
import { dashboardView } from "./dashboard.js";
import { createView } from "./create.js";
import { detailsView } from "./details.js";
import { mypostnView } from "./mypost.js";
import { editView } from "./edit.js";
import { navView } from "./navControl.js";
import { get } from "./api.js";

page(navView);
page('/login', loginView);
page('/register',registerView)
page('/',dashboardView);
page('/create',createView);
page('/details/:id', detailsView);
page('/edit/:id',editView);
page('/mypost',mypostnView);


page.start();


document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/')
}