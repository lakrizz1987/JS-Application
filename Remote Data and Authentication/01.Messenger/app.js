let url = `http://localhost:3030/jsonstore/messenger`;

function attachEvents() {

    document.getElementById('submit').addEventListener('click', submit);
    document.getElementById('refresh').addEventListener('click', refresh);
}

async function refresh() {
    const textArea = document.getElementById('messages');
    textArea.value = '';
    
    let response = await fetch(url);
    let data = await response.json();
    Object.values(data).forEach(obj => {
        textArea.value += `${obj.author}: ${obj.content}` + '\n';
    })
}
async function submit() {
    let nameElement = document.querySelector('[name="author"]');
    let messageElement = document.querySelector('[name="content"]');
    if (nameElement.value != '' && messageElement.value != '') {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                author: nameElement.value,
                content: messageElement.value,
            })
        })
        nameElement.value = '';
        messageElement.value = '';
    }

}
attachEvents();