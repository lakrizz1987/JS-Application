import { html, nothing } from "../node_modules/lit-html/lit-html.js";
import { get } from "../src/api.js";

const mybooksTemplate = (books,allBooksTemplate) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        ${(books.length > 0) ? html`${allBooksTemplate(books)}` : 
        html`<p class="no-books">No books in database!</p>`}
    
    </section>
`;
const allBooksTemplate = (booksData) => html`
    <ul class="my-books-list">
        ${booksData.map(x => html`
        <li class="otherBooks">
            <h3>${x.title}</h3>
            <p>Type: ${x.type}</p>
            <p class="img"><img src=${x.imageUrl}></p>
            <a class="button" href=${`/details/${x._id}`}>Details</a> </li> `)} </ul>
`;
export const myBooksView = async (ctx) =>{
    const user = JSON.parse(localStorage.getItem('user'));
    let data = await get(`http://localhost:3030/data/books?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`);
    let filterData = data.filter(x=>x._ownerId == user._id);
    
    ctx.render(mybooksTemplate(filterData,allBooksTemplate));
}