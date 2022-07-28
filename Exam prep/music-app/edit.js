import page from "./node_modules/page/page.mjs";
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import { get, post, put } from "./api.js";

const editTemplate = (album) => html`
    <section class="editPage">
            <form @submit=${editHandler} data-id=${album._id}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${album.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${album.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${album.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`

const root = document.getElementById('main-content');

export const editView = async (ctx) => {
    let album = await get(`http://localhost:3030/data/albums/${ctx.params.id}`)
    render(editTemplate(album), root);
};

async function editHandler(e){
    e.preventDefault();

    let { name, imgUrl, price, releaseDate, artist, genre, description } = Object.fromEntries(new FormData(e.currentTarget));

    if (!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description) {
        alert('error')
        return
    }else{
        let data = await put(`http://localhost:3030/data/albums/${e.target.dataset.id}`, { name, imgUrl, price, releaseDate, artist, genre, description });
        page.redirect(`/details/${e.target.dataset.id}`)
    }
};
