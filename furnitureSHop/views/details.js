import { del, get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs"

const template = (product) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${product.img.slice(1)}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${product.make}</span></p>
                <p>Model: <span>${product.model}</span></p>
                <p>Year: <span>${product.year}</span></p>
                <p>Description: <span>${product.description}</span></p>
                <p>Price: <span>${product.price}</span></p>
                <p>Material: <span>${product.material}</span></p>
                <div>
                    ${(product._ownerId == JSON.parse(localStorage.getItem('user'))._id) ? html`
                    <a id="${product._id}" href=”javascript:void(0)” class="btn btn-red" @click="${deleteHadler}">Delete</a>
                    <a  href=${`/edit/${product._id}`} class="btn btn-info">Edit</a>` : ''}
                </div>
            </div>
        </div>
    </div>
`

const root = document.getElementById('root');
export const detailView = async (ctx) => {

    let data = await get(`http://localhost:3030/data/catalog/${ctx.params.id}`);
    render(template(data), root)
}

async function deleteHadler(e){
    e.preventDefault()
    //let user = JSON.parse(localStorage.getItem('user'));
   // let token = user.accessToken
    let data = await del(`http://localhost:3030/data/catalog/${e.target.id}`);
    page.redirect('/catalog');

}

