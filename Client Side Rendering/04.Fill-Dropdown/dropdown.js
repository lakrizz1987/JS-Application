import { html, render } from './node_modules/lit-html/lit-html.js'

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function addItem(e) {
    e.preventDefault()
    let text = document.getElementById('itemText').value;
    let isNotExist = true;
    towns.forEach(x => {
        if (x.text == text) {
            isNotExist = false
        }
    })
    if (document.getElementById('itemText').value != '' && isNotExist) {
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })

        })
        let data = await res.json()
        towns.push(data)
        render(template(towns), menu);
        document.getElementById('itemText').value = ''
    }else{
        alert('Input is empty ot town is available!')
    }

}

let menu = document.getElementById('menu');

async function getData() {
    let response = await fetch(url);
    let data = await response.json();
    return Object.values(data);
}

let towns = await getData();

let template = (data) => html`
${data.map(t => html`<option value=${t._id}>${t.text}</option>`)}
`
render(template(towns), menu);

document.querySelector('form').addEventListener('submit', addItem)