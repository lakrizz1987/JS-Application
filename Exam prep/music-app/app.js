import page from "./node_modules/page/page.mjs";
import { navView } from "./navControl.js";
import { homeView } from "./home.js";
import { loginView } from "./login.js";
import { registerView } from "./regisster.js";
import { createView } from "./create.js";
import { catalogView } from "./catalog.js";
import { detailsView } from "./details.js";
import { editView } from "./edit.js";
import { searchView } from "./search.js";

page(homeView)
page(navView);
page('/',homeView);
page('/login',loginView);
page('/register',registerView);
page('/create',createView);
page('/catalog',catalogView);
page('/details/:id',detailsView);
page('/edit/:id',editView);
page('/search',searchView)

page.start();

