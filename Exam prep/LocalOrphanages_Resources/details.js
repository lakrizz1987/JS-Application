import { del, get } from "./api.js";
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

let total = 0;
let detailsTemplate = (product, isOwner) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src="${product.imageUrl}" alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${product.title}</h2>
                    <p class="post-description">Description: ${product.description}</p>
                    <p class="post-address">Address: ${product.address}</p>
                    <p class="post-number">Phone number: ${product.phone}</p>
                    <p class="donate-Item">Donate Materials: ${total}</p>
    
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        ${isOwner(product) ? html`
                        <a href=${`/edit/${product._id}`} class="edit-btn btn">Edit</a>
                        <a id="${product._id}" href="javascript:void(0)" class="delete-btn btn"
                            @click=${deleteHadler}>Delete</a>
                        `: nothing}
    
    
                        <!--Bonus - Only for logged-in users ( not authors )-->
                        ${(!isOwner(product) && isLoged()) ? html`<a id="donate" @click=${setDonate} href="javascript:void(0)"
                            class="donate-btn btn">Donate</a>` : nothing}
                    </div>
    
                </div>
            </div>
        </div>
    </section>
`
const root = document.getElementById('main-content');
export const detailsView = async (ctx) => {
    let product = await get(`http://localhost:3030/data/posts/${ctx.params.id}`)
    render(detailsTemplate(product, isOwner), root);

    function isOwner(product) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id == product._ownerId) {
            return true
        } else {
            return false
        }
    }
}

async function deleteHadler(e) {
    e.preventDefault()
    //let user = JSON.parse(localStorage.getItem('user'));
    // let token = user.accessToken
    let result = confirm("Are you sure you want to delete?")
    if (result) {
        let data = await del(`http://localhost:3030/data/posts/${e.target.id}`);
        page.redirect('/');
    }


}

function isLoged() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return true
    } else {
        return false
    }
}

function setDonate(e) {
    document.getElementById('donate').style.display = 'none'
}