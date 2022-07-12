import { showCreate } from "./create.js";
import { showDashboard } from "./dash.js";
import {showHome} from "./home.js"
import { showLogin } from "./login.js";
import { logout } from "./logout.js";
import { showRegister } from "./register.js";


let main = document.querySelector('main');
main.replaceChildren()

showHome(main)

let links = {
    '/home': showHome,
    '/login':showLogin,
    '/create':showCreate,
    '/register':showRegister,
    '/logout':logout,
    '/dashboard':showDashboard
};

let nav = document.querySelector('nav');

nav.addEventListener('click',(e)=>{
    if(e.target.tagName == 'A'){
        e.preventDefault();
    }
    let url = new URL(e.target.href);
    let view = links[url.pathname]
    view(main)
})

