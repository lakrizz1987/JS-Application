import { get, post } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

let template = (data) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(product => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${product.img.slice(1)}" />
                        <p>${product.description}</p>
                        <footer>
                            <p>Price: <span>${product.price} $</span></p>
                        </footer>
                        <div>
                            <a href="/details/${product._id}" class="btn btn-info">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            `)}
        </div>
`;



const root = document.getElementById('root');


export const myFurnitureView = async (ctx) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let data = await get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${user._id}%22`);
    render(template(data), root);
}


