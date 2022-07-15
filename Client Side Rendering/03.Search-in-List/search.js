import { html, render } from './node_modules/lit-html/lit-html.js';
import { template } from './template.js';
import { towns } from './towns.js';

render(template(towns, ''), document.body)




