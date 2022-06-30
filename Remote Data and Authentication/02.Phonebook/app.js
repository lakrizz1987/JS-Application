function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load);
}

attachEvents();

async function load() {
    let url = `http://localhost:3030/jsonstore/phonebook`;
    let ul = document.getElementById('phonebook');
    let res = await fetch(url);
    let data = await res.json();
    //{person: 'Maya', phone: '+1-555-7653',
    Object.values(data).forEach(obj => {
        let li = document.createElement('li');
        li.textContent = `${obj.person}: ${obj.phone}`;
        let button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);
        ul.appendChild(li);
    })
}