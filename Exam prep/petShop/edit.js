import page from "./node_modules/page/page.mjs"
import { html, render } from "./node_modules/lit-html/lit-html.js"
import { get, put } from "./api.js";

const editTemplate = (pet) => html`
 <section id="editPage">
            <form class="editForm" @submit=${editHandler} data-id=${pet._id}>
                <img src="${pet.image}">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${pet.age} years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${pet.weight}kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
` ;

let root = document.getElementById('content')

export const editView = async (ctx) =>{
    let pet = await get(`http://localhost:3030/data/pets/${ctx.params.id}`)
    render(editTemplate(pet),root);
}

async function editHandler(e){
    e.preventDefault();

    let { name, breed, age, weight, image } = Object.fromEntries(new FormData(e.currentTarget));

    if (!name || !breed || !age || !weight || !image ) {
        alert('error')
        return
    }else{
        let data = await put(`http://localhost:3030/data/pets/${e.target.dataset.id}`, { name, breed, age, weight, image });
        page.redirect(`/details/${e.target.dataset.id}`)
    }
}