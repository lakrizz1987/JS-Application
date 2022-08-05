import page from "./node_modules/page/page.mjs";

import { renderMidleWare } from "/middlewares.js";
import { navView } from "/navView.js";
import { allGameView } from "/allgames.js";
import { createView } from "/create.js";
import { detailsView } from "/details.js";
import { editView } from "/edit.js";
import { homeView } from "/home.js";
import { loginView } from "/login.js";
import { registerView } from "/register.js";

page(navView);
page(renderMidleWare);
page('/login',loginView);
page('/register',registerView);
page('/',homeView);
page('/create', createView);
page('/details/:id',detailsView);
page('/edit/:id',editView)
page('/allgames',allGameView)


page.start()