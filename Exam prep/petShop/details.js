import page from "./node_modules/page/page.mjs"
import { html, nothing, render } from "./node_modules/lit-html/lit-html.js"
import { del, get } from "./api.js";

const detailsTemplate = (pet, isOwner,isLoged) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${pet.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${isOwner(pet) ? html`<div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                <a href=${`/edit/${pet._id}`} class="edit">Edit</a>
                <a id=${pet._id} href="javascript:void(0)" class="remove" @click=${deleteHadler}>Delete</a>

               
                <!--(Bonus Part) Only for no creator and user-->

            </div>` : nothing}
            ${(!isOwner(pet) && isLoged()) ? html` <a href="#" class="donate">Donate</a>` : nothing}

        </div>
    </div>
</section>
` ;

let root = document.getElementById('content')

export const detailsView = async (ctx) => {
    let pet = await get(`http://localhost:3030/data/pets/${ctx.params.id}`)
    render(detailsTemplate(pet, isOwner,isLoged), root);
    
    function isLoged() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            console.log('asdas')
            return true
        } else {
            console.log('ddddd')
            return false
        }
    }
}

function isOwner(product) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id == product._ownerId) {
        return true
    } else {
        console.log('aaaaa')
        return false
    }

    
}



async function deleteHadler(e) {
    e.preventDefault()
    //let user = JSON.parse(localStorage.getItem('user'));
    // let token = user.accessToken
    let result = confirm("Are you sure you want to delete?")
    if (result) {
        let data = await del(`http://localhost:3030/data/pets/${e.target.id}`);
        page.redirect('/');
    }

}