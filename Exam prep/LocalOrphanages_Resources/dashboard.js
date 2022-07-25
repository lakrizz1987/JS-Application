import { get } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let productsTemplate = (product) => html`
    <div class="post">
        <h2 class="post-title">${product.title}</h2>
        <img class="post-image" src="${product.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href=${`/details/${product._id}`} class="details-btn btn">Details</a>
        </div>
    </div>
`

let noProductsTemplate = () => html`
<h1 class="title no-posts-title">No posts yet!</h1>
`

let dashboardTemplate = (products) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        ${(products.length > 0) ? html `<div class="all-posts">
                                ${products.map(x=> productsTemplate(x))}
                          </div>` : html` ${noProductsTemplate()}`
                         }
    </section>
`
const root = document.getElementById('main-content');
export const dashboardView = async (ctx) => {
    let products = await get('http://localhost:3030/data/posts?sortBy=_createdOn%20desc')
    render(dashboardTemplate(products), root);
}

