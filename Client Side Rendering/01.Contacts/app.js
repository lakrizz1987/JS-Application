import {contacts} from './contacts.js'
import {html,render} from './node_modules/lit-html/lit-html.js'
import { contactCard } from './template.js';

let root = document.getElementById('contacts');

render(contactCard(contacts),root)

