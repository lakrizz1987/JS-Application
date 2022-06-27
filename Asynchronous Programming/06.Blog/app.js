function attachEvents() {
    let loadBtnElement = document.getElementById('btnLoadPosts');
    let viewBtnElement = document.getElementById('btnViewPost');

    let selectElement = document.getElementById('posts');

    loadBtnElement.addEventListener('click', loadPosts);

    

    



    
}

attachEvents();

async function loadPosts() {
    let response = await fetch('http://localhost:3030/jsonstore/blog/posts');
    let data = await response.json();
    return data;
}

async function getCommentsByID(id){
    let response = await fetch('http://localhost:3030/jsonstore/blog/comments');
    let data = await response.json();
    let array = Object.values(data).filter(x => x.id == id);
    return array;
}

function create(type, content, parent) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (parent) {
        parent.appendChild(element)
    }

    return element;
}