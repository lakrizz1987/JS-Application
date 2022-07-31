import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get } from "../src/api.js";

const bookTemplate = (books) => html`
    <ul class="other-books-list">
        ${books.map(book => html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <a class="button" href="/details/${book._id}">Details</a> </li> `)} </ul>
`
const dashboardTemplate = (allBooks) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <!-- Display ul: with list-items for All books (If any) -->
        ${(allBooks.length > 0) ? bookTemplate(allBooks) : html`<p class="no-books">No books in database!</p>`}
        <!-- Display paragraph: If there are no books in the database -->
    </section>
`
export const dashboardView = async (ctx) => {
    const data = await get('http://localhost:3030/data/books?sortBy=_createdOn%20desc');
    ctx.render(dashboardTemplate(data));

} 