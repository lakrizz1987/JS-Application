import { post } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let createTemplate = () => html`
    <section id="create-page" class="auth">
        <form id="create" @submit=${createHandler}>
            <h1 class="title">Create Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title">
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description">
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl">
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address">
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone">
            </article>
    
            <input type="submit" class="btn submit" value="Create Post">
        </form>
    </section>
`
const root = document.getElementById('main-content');
export const createView = (ctx) => {
    render(createTemplate(), root);
}

async function createHandler(e) {
    e.preventDefault();
    let { title, description, imageUrl, address, phone } = Object.fromEntries(new FormData(e.currentTarget));

    if (!title || !description || !imageUrl || !address || !phone ) {
        alert('error')
        return
    }else{
        let data = await post('http://localhost:3030/data/posts', { title, description, imageUrl, address, phone });
        page.redirect('/')
    }
}