import { get } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const itemsTemplate = (item) => html`
    <div class="offer">
        <img src=${item.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${item.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
        <a class="details-btn" href=${`/details/${item._id}`}>Details </a> </div>
`

const dashTemplate = (items) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${(items.length > 0) ? html`${items.map(x => itemsTemplate(x))}` : html`<h2>No offers yet.</h2>`}
    </section>
`

export const dashView = async (ctx) => {
    const data = await get('http://localhost:3030/data/offers?sortBy=_createdOn%20desc');
    ctx.render(dashTemplate(data));

} 