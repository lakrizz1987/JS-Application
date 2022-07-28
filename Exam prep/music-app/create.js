import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { post } from "./api.js";

const createTemplate = (createHandler) => html`
    <section class="createPage">
        <form @submit=${createHandler}>
            <fieldset>
                <legend>Add Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" placeholder="Album name">
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" placeholder="Price">
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" placeholder="Description"></textarea>
    
                    <button class="add-album" type="submit">Add New Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`

const root = document.getElementById('main-content');

export const createView = (ctx) => {
    render(createTemplate(createHandler), root);
};

async function createHandler(e) {
    e.preventDefault();
    let { name, imgUrl, price, releaseDate, artist, genre, description } = Object.fromEntries(new FormData(e.currentTarget));

    if (!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description) {
        alert('error')
        return
    } else {
        let data = await post('http://localhost:3030/data/albums', { name, imgUrl, price, releaseDate, artist, genre, description });
        page.redirect('/catalog')
    }
};