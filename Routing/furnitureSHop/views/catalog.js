import { get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"


const catalogTemplate = (data) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
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
                        <a href="/details/${product._id}" id="${product._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
        `)}
    </div>
`;

const root = document.getElementById('root');


export const catalogView = async (ctx) => {
    let data = await get('http://localhost:3030/data/catalog');
    render(catalogTemplate(data), root);
}