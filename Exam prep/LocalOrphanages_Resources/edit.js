import { get, put } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let editTemplate = (product) => html`
    <section id="edit-page" class="auth">
            <form id="edit" @submit=${editHandler} data-id=${product._id}>
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value="${product.title}">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value="${product.description}">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value="${product.imageUrl}">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value="${product.address}">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value="${product.phone}">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>
`
const root = document.getElementById('main-content');
export const editView = async (ctx) => {
    let product = await get(`http://localhost:3030/data/posts/${ctx.params.id}`)
    render(editTemplate(product), root);
}

async function editHandler(e){
    e.preventDefault();

    let { title, description, imageUrl, address, phone } = Object.fromEntries(new FormData(e.currentTarget));

    if (!title || !description || !imageUrl || !address || !phone ) {
        alert('error')
        return
    }else{
        let data = await put(`http://localhost:3030/data/posts/${e.target.dataset.id}`, { title, description, imageUrl, address, phone });
        page.redirect(`/details/${e.target.dataset.id}`)
    }
}