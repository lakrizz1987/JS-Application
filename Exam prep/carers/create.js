import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const createTemplate = (createHandler) => html`
    <section id="create">
        <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${createHandler}>
                <input type="text" name="title" id="job-title" placeholder="Title" />
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
                <input type="text" name="category" id="job-category" placeholder="Category" />
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                    cols="50"></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
`

export function createView(ctx) {
    ctx.render(createTemplate(createHandler));

    async function createHandler(e) {
        e.preventDefault();
        let { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.currentTarget));

        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            alert('error')
            return
        } else {
            let data = await post('http://localhost:3030/data/offers', { title, imageUrl, category, description, requirements, salary });
            ctx.page.redirect('/dashboard')
        }
    };
}