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

        Object.values(data).forEach(obj => {
            let tr = create('tr', '', tbody);
            let tdBook = create('td', obj.title, tr);
            let tdAithot = create('td', obj.author, tr);
            let tdBtns = create('td', '', tr);
            let editBtn = create('button', 'Edit', tdBtns);
            let delBtn = create('button', 'Delete', tdBtns);
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