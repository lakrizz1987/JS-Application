import page from "../node_modules/page/page.mjs";
import { addView } from "../views/add.js";
import { dashboardView } from "../views/dashboard.js";
import { detailsView } from "../views/details.js";
import { editView } from "../views/edit.js";
import { loginView } from "../views/login.js";
import { navView } from "../views/navigation.js";
import { registerView } from "../views/register.js";
import { renderMidleWare } from "./midlewares.js";

page(navView);
page(renderMidleWare);
page('/details/:id',detailsView)
page('/login',loginView)
page('/',dashboardView)
page('/register',registerView);
page('/add',addView);
page('/edit/:id',editView)


page.start();