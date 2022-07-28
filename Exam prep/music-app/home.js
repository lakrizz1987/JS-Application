import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { post } from "./api.js";

let homeTemplate = ()=> html`
<section id="welcomePage">
            <div id="welcome-message">
                <h1>Welcome to</h1>
                <h1>My Music Application!</h1>
            </div>

            <div class="music-img">
                <img src="./images/musicIcons.webp">
            </div>
        </section>
`;

const root = document.getElementById('main-content');

export const homeView = (ctx,next) =>{
    render(homeTemplate(),root);
    next()
};