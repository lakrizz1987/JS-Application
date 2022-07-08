import { createCatalog } from "./catalog.js";
import { navButtonsRouter } from "./navBtnRouter.js";

let sectionCreate = document.querySelector('#create');

export function createView() {
    sectionCreate.style.display = 'block';
}

let form = document.getElementById('create-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let dataForm = new FormData(e.currentTarget);
    let name = dataForm.get('name');
    let img = dataForm.get('img');
    let user = JSON.parse(localStorage.user);

    try {
        let response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({ name, img })
        })
        if (response.ok == false) {
            let dataError = await response.json();
            throw new Error(dataError.message);
        }

        navButtonsRouter();
        createCatalog();
        Array.from(document.querySelectorAll('section')).forEach(x => x.style.display = 'none')
        document.querySelector('#catalog').style.display = 'block';
    } catch (err) {
        alert(err.message)
    }
})
