import { loadAll } from './loadAll.js';
import { createBook } from './createBook.js';
import {fetchNewRecord} from './fetchNewRecord.js';

const buttonElement = document.getElementById('loadBooks');
buttonElement.addEventListener('click', loadAll);

document.querySelector('form').addEventListener('submit', createBook);
document.getElementById('update').addEventListener('submit',fetchNewRecord);