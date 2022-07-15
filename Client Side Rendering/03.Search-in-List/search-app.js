import { html, render } from './node_modules/lit-html/lit-html.js';
import { template } from './template.js';
import { towns } from './towns.js';

export function search() {
    let word = document.getElementById('searchText').value;
    render(template(towns, word), document.body);
 }