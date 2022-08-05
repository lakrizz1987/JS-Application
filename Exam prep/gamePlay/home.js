import { get } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

const singleGameTemplate = (game) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=${game.imageUrl}>
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${game._id}`} class="btn details-btn">Details</a>
        </div>
    </div>
`
const homeTemplate = (games) => html`
    <section id="welcome-world">
    
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">
    
        <div id="home-page">
            <h1>Latest Games</h1>
    
            <!-- Display div: with information about every game (if any) -->
            ${games.length > 0 ? html`${games.map(x => singleGameTemplate(x))}` : html`<p class="no-articles">No games yet</p>
            `}
    
    
            <!-- Display paragraph: If there is no games  -->
    
        </div>
    </section>

`

export const homeView = async (ctx) => {
    const data = await get('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category');
    ctx.render(homeTemplate(data));

} 