import { html, render } from './node_modules/lit-html/lit-html.js';

let root = document.getElementById('root');

let template = (data) => html`
<ul>
    ${data.map((x) => html`<li>${x}</li>`)}
</ul>
`

document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault();
    let towns = document.getElementById('towns').value.split(', ');

    render(template(towns), root);
})
