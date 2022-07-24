import { del, get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs";
import { catalogView } from "../views/catalog.js";
import { createView } from "../views/create.js";
import { detailView } from "../views/details.js";
import { editView } from "../views/edit.js";
import { loginView } from "../views/loginView.js";
import { myFurnitureView } from "../views/myCollection.js";
import { navView } from "../views/navView.js";
import { registerView } from "../views/register.js";

page(navView)
page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailView);
page('/my-furniture', myFurnitureView);
page('/edit/:id',editView)


page.start();

document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

async function logoutHandler() {
    let data = await get('http://localhost:3030/users/logout');

    localStorage.clear();
    page.redirect('/catalog')
}



