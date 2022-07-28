import page from "./node_modules/page/page.mjs";
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import { get, post, put } from "./api.js";


const searchTemplate = (searchHandler,albums) => html`
     <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${searchHandler} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
                
            ${(albums.length < 1) ? html`<p class="no-result">No result.</p>`: html`${albums.map(x=>albumTemp(x))}` }
       
        </section>
`;

let albumTemp = (album) => html`
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
                        <div class="btn-group">
                           ${(JSON.parse(localStorage.getItem('user'))) ? html`<a href=${`/details/${album._id}`} id="details">Details</a>`: nothing} 
                        </div>
                    </div>
`

const root = document.getElementById('main-content');


export const searchView = (ctx) => {

    render(searchTemplate(searchHandler,[]), root);

    async function searchHandler(){
        let searchedText = document.getElementById('search-input').value;
        if(searchedText != ''){
            let data = await get(`http://localhost:3030/data/albums?where=name%20LIKE%20%22${searchedText}%22`);
            render(searchTemplate(searchHandler,data), root);
        }
    };

};

   


