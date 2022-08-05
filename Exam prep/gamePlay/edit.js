import { put, get } from "./api.js";
import { html, nothing } from "./node_modules/lit-html/lit-html.js";

const editTemplate = (game, editHandler) => html`
    <section id="edit-page" class="auth">
        <form id="edit" @submit=${editHandler} data-id=${game._id}>
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value=${game.title}>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value=${game.category}>
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value=${game.maxLevel}>
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value=${game.imageUrl}>
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>
`
export const editView = async (ctx) => {
    let game = await get(`http://localhost:3030/data/games/${ctx.params.id}`)
    ctx.render(editTemplate(game, editHandler));

    async function editHandler(e) {
        e.preventDefault();

        let { title, category, maxLevel, imageUrl, summary } = Object.fromEntries(new FormData(e.currentTarget));

        if (!title || !category || !maxLevel || !imageUrl || !summary) {
            alert('error')
            return
        } else {
            let data = await put(`http://localhost:3030/data/games/${e.target.dataset.id}`, { title, category, maxLevel, imageUrl, summary });
            ctx.page.redirect(`/details/${e.target.dataset.id}`)
        }
    }
}