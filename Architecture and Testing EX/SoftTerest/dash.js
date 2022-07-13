import { get } from "./api.js";

let sectionDash = document.getElementById('dashboard-holder');


export async function showDashboard(section) {
    sectionDash.innerHTML = '';
    let idea = await getData();

    Array.from(idea).forEach(element => {
        let div = document.createElement('div');
        div.className = 'card overflow-hidden current-card details';
        div.style.width = '20rem';
        div.style.height = '18rem';
        console.log(element)
        div.innerHTML = `
        <div class="card-body">
                <p class="card-text">${element.title}</p>
            </div>
            <img class="card-image" src="${element.img}" alt="Card image cap">
            <a class="btn" id ="${element._id}" href="">Details</a>
        `;

        sectionDash.appendChild(div);

    });
    section.replaceChildren(sectionDash);

}

async function getData() {
    let idea = await get("http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");

    return idea;
}
