import { get } from "./api.js";
import { html, nothing } from "./node_modules/lit-html/lit-html.js";

const OneGameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href=${`/details/${game._id}`} class="details-button">Details</a>
        </div>
    </div>
`

const allGameTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${(games.length > 0) ? html`${games.map(OneGameTemplate)}` : html` <h3 class="no-articles">No articles yet</h3>`}
    
        <!-- Display paragraph: If there is no games  -->
    
    </section>
`

export const allGameView = async (ctx) => {
    let data = await get(`http://localhost:3030/data/games?sortBy=_createdOn%20desc`)
    ctx.render(allGameTemplate(data));
}