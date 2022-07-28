import page from "./node_modules/page/page.mjs";
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import { get, post } from "./api.js";

let catalogTemplate = (albums) => html`

<section id="catalogPage">
            <h1>All Albums</h1>
        ${albums.length == 0 ? html` ${noAlbumTemplate()} ` : html`${albums.map(x=> albumTemplate(x))}`}
</section>

`;

let albumTemplate = (album) =>html`
<div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${isLoged() ? html `
                    <div class="btn-group">
                        <a href=${`/details/${album._id}`} id="details">Details</a>
                    </div>` : nothing}
                    
                </div>
            </div>
`

let noAlbumTemplate = () => html`
<p>No Albums in Catalog!</p>
`

function isLoged() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return true
    }else{
        return false
    }
}

const root = document.getElementById('main-content');
export const catalogView = async (ctx) => {
    let albums = await get('http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name')
    render(catalogTemplate(albums), root);
}