let sectionCatalog = document.querySelector('#catalog');

export function catalogView(){
    sectionCatalog.style.display = 'block';
}

export async function createCatalog(){
    let response = await fetch('http://localhost:3030/data/recipes');
    let data = await response.json();
    sectionCatalog.innerHTML = '';
    data.forEach(element => {
        let fragment = document.createDocumentFragment();
        let article = document.createElement('article');
        article.innerHTML = `
        <h2>${element.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${element.img}">
            </div>
        </div>`
        fragment.appendChild(article);
        sectionCatalog.appendChild(fragment);
    });
}