import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById('site-content');

const renderView = (el) => {
    render(el,root);
}

export const renderMidleWare = (ctx,next) =>{
    ctx.render = renderView;
    next();
}