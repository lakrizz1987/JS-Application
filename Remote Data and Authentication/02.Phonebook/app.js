function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load);
    document.getElementById('btnCreate').addEventListener('click', createContact);

}

attachEvents();

async function load() {
    let url = `http://localhost:3030/jsonstore/phonebook`;
    let ul = document.getElementById('phonebook');
    let res = await fetch(url);
    let data = await res.json();
    //{person: 'Maya', phone: '+1-555-7653',
    ul.innerHTML = '';
    Object.values(data).forEach(obj => {
        let li = document.createElement('li');
        li.textContent = `${obj.person}: ${obj.phone}`;
        let button = document.createElement('button');
        button.id = obj._id;
        button.textContent = 'Delete';
        li.appendChild(button);
        ul.appendChild(li);

        button.addEventListener('click', async (e) => {
            const parent = e.target.parentNode;
            let res = await fetch(`http://localhost:3030/jsonstore/phonebook/${button.id}`, {
                method: "DELETE"
            })
            parent.remove();
        })
    })
}

async function createContact() {
    const pesonElement = document.getElementById('person');
    const phoneElement = document.getElementById('phone');

    let url = 'http://localhost:3030/jsonstore/phonebook';
    if (pesonElement.value != '' && phoneElement.value != '') {
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "person": pesonElement.value,
                "phone": phoneElement.value
            })
        })
        pesonElement.value = '';
        phoneElement.value = '';
        document.getElementById('btnLoad').click();
    }

}