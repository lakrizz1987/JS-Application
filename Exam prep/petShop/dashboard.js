import page from "./node_modules/page/page.mjs"
import { html, render } from "./node_modules/lit-html/lit-html.js"
import { get } from "./api.js";


let onePetTemplate = (pet) => html`
 <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="${pet.image}">
                    </article>
                    <h2 class="name">${pet.name}</h2>
                    <h3 class="breed">${pet.breed}</h3>
                    <div class="action">
                        <a class="btn" href=${`/details/${pet._id}`}>Details</a>
                    </div>
                </div>
`

const dashTemplate = (pets) => html`
 <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
            ${(pets.length > 0) ? html `${pets.map(pet => onePetTemplate(pet))}` : html` <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`
                         }
                <!--If there is no pets in dashboard-->
                
            </div>
        </section>

` ;

let root = document.getElementById('content')

export const dashView = async (ctx) =>{
    let pets = await get('http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name')
    render(dashTemplate(pets),root);
}