import { html } from "../node_modules/lit-html/lit-html.js";
import { post } from "../src/api.js";

const addTemplate = (createHandler) => html`
    <section id="create-page" class="create">
        <form id="create-form" action="" method="" @submit=${createHandler}>
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
`
export function addView(ctx) {
    ctx.render(addTemplate(createHandler));

    async function createHandler(e) {
        e.preventDefault();
        let { title, description, imageUrl, type } = Object.fromEntries(new FormData(e.currentTarget));
        console.log(type)
        if (!title || !imageUrl || !type || !description) {
            alert('error')
            return
        } else {
            let data = await post('http://localhost:3030/data/books', { title, description, imageUrl, type });
            ctx.page.redirect('/')
        }
    };
}