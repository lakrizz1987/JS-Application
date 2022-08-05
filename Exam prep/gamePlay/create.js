import { post } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const createTemplate = (createHandler) => html`
    <section id="create-page" class="auth">
            <form id="create" @submit=${createHandler}>
                <div class="container">

                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
                </div>
            </form>
        </section>
`

export function createView(ctx) {
    ctx.render(createTemplate(createHandler));

    async function createHandler(e) {
        e.preventDefault();
        let { title, category, maxLevel, imageUrl,summary } = Object.fromEntries(new FormData(e.currentTarget));
        
        if (!title || !category || !maxLevel || !imageUrl || !summary) {
            alert('error')
            return
        } else {
            let data = await post('http://localhost:3030/data/games', { title, category, maxLevel, imageUrl,summary });
            ctx.page.redirect('/')
        }
    };
}