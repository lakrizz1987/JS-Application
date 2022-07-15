import { counter } from './counter.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { search } from './search-app.js';

let template = (towns, match) => html`
<article>
    <div id="towns">
        <ul>
            ${towns.map((t) => html`<li class=${(match && t.toLowerCase().includes(match.toLowerCase())) ? 'active' : ''
     }>
                ${t}</li>`)}
        </ul>
    </div>
    <input type="text" id="searchText" />
    <button @click=${search}>Search</button>
    <div id="result">${counter(towns, match) ? `You found ${counter(towns, match)} matches` : ''}</div>
</article>
`
export { template };