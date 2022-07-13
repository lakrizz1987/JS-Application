import { post } from "./api.js";
import { showDashboard } from "./dash.js";
import { navContorl } from "./navControl.js";

let sectionCreate = document.getElementById('createPage');

export function showCreate(section){
    section.replaceChildren(sectionCreate);
}

let form = document.getElementById('create-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let data = new FormData(form);

    let title = data.get('title')
    let description = data.get('description');
    let img = data.get('imageURL');

    let user = await post('http://localhost:3030/data/ideas', { title, description,img });
    //let userData = JSON.stringify(user)
    
    form.reset() 
    let main = document.querySelector('main');
    main.replaceChildren()

    showDashboard(main)
    navContorl()
});