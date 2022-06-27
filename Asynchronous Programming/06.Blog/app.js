function attachEvents() {
    let loadBtnElement = document.getElementById('btnLoadPosts');
    let viewBtnElement = document.getElementById('btnViewPost');



    loadBtnElement.addEventListener('click', loadPosts);
    viewBtnElement.addEventListener('click', getComments);



}

attachEvents();
let info = {};
async function loadPosts() {
    let selectElement = document.getElementById('posts');
    let response = await fetch('http://localhost:3030/jsonstore/blog/posts');
    let data = await response.json();

    Object.values(data).forEach(obj => {
        let option = create('option', `${obj.title}`, selectElement);
        option.value = obj.id;
        info[obj.id] = [obj.body, obj.title];
    })

}

function getComments() {
    let selectElement = document.getElementById('posts');
    let id = selectElement.value;
    getCommentsByID(id)
}

async function getCommentsByID(id) {
    let response = await fetch('http://localhost:3030/jsonstore/blog/comments');
    let data = await response.json();
    let array = Object.values(data).filter(x => x.postId == id);

    document.getElementById('post-title').textContent = info[id][1];
    document.getElementById('post-body').textContent = info[id][0];
    let ul = document.getElementById('post-comments');
    ul.innerHTML = '';
    array.forEach(x => {
        let li = create('li', `${x.text}`, ul)
    })
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