import { showHidenInfo } from "./function.js";
import {html} from './node_modules/lit-html/lit-html.js'

const template = (data) => html`
<ul>
    ${data.map(x => html`
    <li>
        <img src="./images/${x.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showHidenInfo}>Show status code</button>
            <div class="status" style="display: none" id="${x.id}">
                <h4>Status Code: ${x.statusCode}</h4>
                <p>${x.statusMessage}</p>
            </div>
        </div>
    </li>
    `)}
</ul>
`;

export { template };