
import {render} from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById('main-content');

const renderView = (el) => {
    render(el,root);
}

export const renderMidleWare = (ctx,next) =>{
    ctx.render = renderView;
    next();
}