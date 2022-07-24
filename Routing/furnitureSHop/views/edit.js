import { get, put } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"



const editTeplate = (product) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form data-id=${product._id} @submit=${editHandler}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value="${product.make}">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model"
                        value="${product.model}">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year"
                        value="${product.year}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                        value="${product.description}">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value="${product.price}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value="${product.img}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material"
                        value="${product.material}">
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
</div>

`

const root = document.getElementById('root');


export const editView = async (ctx) => {
    let data = await get(`http://localhost:3030/data/catalog/${ctx.params.id}`)
    render(editTeplate(data), root);
}

async function editHandler(e) {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    let model = data.get('model');
    let make = data.get('make');
    let year = data.get('year');
    let price = data.get('price')
    let description = data.get('description');
    let img = data.get('img');
    let material = data.get('material');
    let id = e.currentTarget.dataset.id;

    let obj = { model, make, year, description,price, img, material, _id: id }
    await put(`http://localhost:3030/data/catalog/${id}`, obj);
    page.redirect('/catalog')

}