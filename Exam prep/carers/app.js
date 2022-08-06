import { createView } from "./create.js";
import { dashView } from "./dashboard.js";
import { detailsView } from "./details.js";
import { editView } from "./edit.js";
import { homeView } from "./home.js";
import { loginView } from "./login.js";
import { renderMidleWare } from "./middleware.js";
import { navView } from "./navigation.js";
import page from "./node_modules/page/page.mjs";
import { registerView } from "./register.js";

page(navView);
page(renderMidleWare);

page('/', homeView);
page('/login', loginView);
page('/register',registerView);
page('/dashboard', dashView);
page('/create', createView);
page('/details/:id',detailsView);
page('/edit/:id',editView);


page.start();