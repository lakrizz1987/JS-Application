import { get } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let mypostTemplate = (products) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        ${(products.length > 0) ? html`
        <div class="my-posts">
            ${products.map(x => template(x))}
        </div>
        ` : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    
    
        <!-- Display an h1 if there are no posts -->
    
    </section>
`
let template = (product) => html`
<div class="post">
    <h2 class="post-title">${product.title}</h2>
    <img class="post-image" src="${product.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href=${`/details/${product._id}`} class="details-btn btn">Details</a>
    </div>
</div>
`
const root = document.getElementById('main-content');
export const mypostnView = async (ctx) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let data = await get(`http://localhost:3030/data/posts?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`)
   render(mypostTemplate(data), root);

}