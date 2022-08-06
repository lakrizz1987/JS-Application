import { get, put } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const editTemplate = (item,editHandler) => html`
    <section id="edit">
        <div class="form">
          <h2>Edit Offer</h2>
          <form class="edit-form" @submit=${editHandler} data-id=${item._id}>
            <input type="text" name="title" id="job-title" placeholder="Title" value=${item.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${item.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${item.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${item.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
              cols="50">${item.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${item.salary} />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export const editView = async (ctx) => {
    let job = await get(`http://localhost:3030/data/offers/${ctx.params.id}`)
    ctx.render(editTemplate(job, editHandler));

    async function editHandler(e) {
        e.preventDefault();

        let { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.currentTarget));

        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            alert('error')
            return
        } else {
            let data = await put(`http://localhost:3030/data/offers/${e.target.dataset.id}`, { title, imageUrl, category, description, requirements, salary });
            ctx.page.redirect(`/details/${e.target.dataset.id}`)
        }
    }
}

