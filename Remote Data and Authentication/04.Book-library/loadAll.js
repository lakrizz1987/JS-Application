import { createBook } from "./createBook.js";

export async function loadAll(e) {
    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/books');
        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message)
        }
        let data = await response.json();

        console.log(data)
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        let i = 0;

        Object.values(data).forEach(obj => {

            let tr = create('tr', '', tbody);
            let tdBook = create('td', obj.title, tr);
            let tdAithot = create('td', obj.author, tr);
            let tdBtns = create('td', '', tr);
            let editBtn = create('button', 'Edit', tdBtns);
            let delBtn = create('button', 'Delete', tdBtns);
            editBtn.id = Object.keys(data)[i];
            delBtn.id = Object.keys(data)[i];

            i++;

            delBtn.addEventListener('click', deleteBook);
            editBtn.addEventListener('click', editBook);
        })

    } catch (err) {
        alert(err.message);
    }
}

function create(type, content, parent) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}

async function deleteBook(e) {
    let id = e.currentTarget.id
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'delete'
        });
        if (response.ok == false) {
            let dataErr = await response.json();
            throw new Error(dataErr.message);
        }
        document.getElementById('loadBooks').click();
    } catch (err) {
        alert(err.message)
    }

}


async function editBook(e) {
    let id = e.currentTarget.id
    let parent = e.currentTarget.parentNode.parentNode;
    let title = parent.querySelector('td:nth-of-type(1)').textContent;
    let author = parent.querySelector('td:nth-of-type(2)').textContent;

    let inputTitle = document.querySelector('input[name="title"]');
    let inputAuthor = document.querySelector('input[name="author"]');
    inputTitle.value = title;
    inputAuthor.value = author;

    let h3Element = document.querySelector('form h3');
    h3Element.textContent = 'Edit FORM';
    let buttonElement = document.querySelector('form button');
    buttonElement.textContent = 'Save';

    let form = document.querySelector('form');
    form.removeEventListener('submit', createBook);

    let formData1 = new FormData(form);

    let newTitle = formData1.get('title');
    let newAuthor = formData1.get('author');

    form.addEventListener('submit', update);

    async function update(e) {
        e.preventDefault();

        try {
            let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'author': newAuthor, "title": newTitle })
            })
        } catch (err) {
            alert(err.message)
        }
    }
}

