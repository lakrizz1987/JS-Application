import { del, get } from "./api.js";
import { showHome } from "./home.js";
import { navContorl } from "./navControl.js";

let sectionDash = document.getElementById('dashboard-holder');


export async function showDashboard(section) {
    sectionDash.innerHTML = '';
    let idea = await getData();
    if (idea.length < 1) {
        sectionDash.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`
    } else {
        Array.from(idea).forEach(element => {
            let div = document.createElement('div');
            div.className = 'card overflow-hidden current-card details';
            div.style.width = '20rem';
            div.style.height = '18rem';
            div.innerHTML = `
            <div class="card-body">
                    <p class="card-text">${element.title}</p>
                </div>
                <img class="card-image" src="${element.img}" alt="Card image cap">
                <a class="btn btnDetails" id ="${element._id}" href="">Details</a>
            `;

            sectionDash.appendChild(div);

        });
    }

    section.replaceChildren(sectionDash);

}

async function getData() {
    let idea = await get("http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");

    return idea;
}

let detailsPage = document.getElementById('detailsPage');
sectionDash.addEventListener('click', async (e) => {

    if (e.target.tagName == 'A') {
        e.preventDefault();
        let id = e.target.id;
        let data = await get(`http://localhost:3030/data/ideas/${id}`);
        //console.log(data)
        detailsPage.innerHTML = '';
        detailsPage.innerHTML = `
       <img class="det-img" src="${data.img}" />
        <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
        </div>
        
       `
        let user = JSON.parse(localStorage.getItem('user'));
       // console.log(user._id)
        //console.log(data._ownerId)
        if (user && user._id == data._ownerId) {
            detailsPage.innerHTML += `<div class="text-center">
            <a id="${id}" class="btn detb" href="">Delete</a>
        </div>`
        }
    };

    let main = document.querySelector('main');
    main.replaceChildren(detailsPage)

    //showHome(main)
    navContorl()
})

detailsPage.addEventListener('click',async (e)=>{
    if(e.target.tagName == 'A'){
        e.preventDefault();
        let res = await del(`http://localhost:3030/data/ideas/${e.target.id}`);
    }
})
