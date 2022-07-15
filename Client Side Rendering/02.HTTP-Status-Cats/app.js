import {html,render} from './node_modules/lit-html/lit-html.js';
import {cats} from './catSeeder.js';
import { template } from './templates.js';

const root = document.getElementById('allCats');

render(template(cats),root);