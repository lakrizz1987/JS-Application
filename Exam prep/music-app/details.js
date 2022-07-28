import page from "./node_modules/page/page.mjs";
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import { del, get, post } from "./api.js";


const detailsTemplate = (album,isOwner) => html`
     <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${album.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.prise}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${(isLoged() && isOwner(album)) ? html`
                    <div class="actionBtn">
                        <a href=${`/edit/${album._id}`} class="edit">Edit</a>
                        <a id="${album._id}" href="javascript:void(0)" class="remove" @click=${deleteHadler}>Delete</a>
                    </div>` : nothing}
                    
                </div>
            </div>
        </section>
`

const root = document.getElementById('main-content');

export const detailsView = async (ctx) => {
    let album = await get(`http://localhost:3030/data/albums/${ctx.params.id}`)
    render(detailsTemplate(album, isOwner), root);

    function isOwner(album) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id == album._ownerId) {
            return true
        } else {
            return false
        }
    };
};

function isLoged() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return true
    } else {
        return false
    }
};

async function deleteHadler(e) {
    e.preventDefault();
    //let user = JSON.parse(localStorage.getItem('user'));
    // let token = user.accessToken
    let result = confirm("Are you sure you want to delete?");
    if (result) {
        let data = await del(`http://localhost:3030/data/albums/${e.target.id}`);
        page.redirect('/catalog');
    }

};
