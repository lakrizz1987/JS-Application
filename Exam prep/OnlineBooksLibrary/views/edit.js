import { html, nothing } from "../node_modules/lit-html/lit-html.js";
import { get, put } from "../src/api.js";

const editTemplate = (book, editHandler) => html`
    <section id="edit-page" class="edit">
        <form id="edit-form" action="#" method="" @submit=${editHandler} data-id=${book._id}>
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${book.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${book.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value=${book.type}>
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`

export const editView = async (ctx) => {
    let book = await get(`http://localhost:3030/data/books/${ctx.params.id}`)
    ctx.render(editTemplate(book, editHandler));

    async function editHandler(e) {
        e.preventDefault();

        let { title, description, imageUrl, type } = Object.fromEntries(new FormData(e.currentTarget));

        if (!title || !imageUrl || !type || !description) {
            alert('error')
            return
        } else {
            let data = await put(`http://localhost:3030/data/books/${e.target.dataset.id}`, { title, description, imageUrl, type });
            ctx.page.redirect(`/details/${e.target.dataset.id}`)
        }
    }
}

