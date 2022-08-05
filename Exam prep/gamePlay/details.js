
import { del, get, post } from "./api.js";
import { html, nothing } from "./node_modules/lit-html/lit-html.js";

const detailsTemplate = (game, comentari, isOwner, deleteHadler, isLoged,commnetHandler) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">
                ${game.summary}
            </p>
    
    
            <div class="buttons">
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${(isOwner(game)) ? html`
    
                <a href=${`/edit/${game._id}`} class="button">Edit</a>
                <a id=${game._id} href="javascript:void(0)" @click=${deleteHadler} class="button">Delete</a>
    
                ` : nothing}
            </div>
    
            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
    
                ${(comentari.length == 0) ? html`<p class="no-comment">No comments.</p>` :
        html`${commnetsTemplate(comentari)}`}
                <!-- Display paragraph: If there are no games in the database -->
    
    
            </div>
    
            ${(isLoged() && !isOwner(game)) ? html`${commnetFormTemplate(commnetHandler)}` : nothing }
    
    </section>
`

const commnetsTemplate = (el) => html`
    <ul>
        <!-- list all comments for current game (If any) -->
        ${el.map(x => html`<li class="comment">
            <p>Content: ${x.comment}</p>
        </li>`)}
    
    
    </ul>
`


const commnetFormTemplate = (commnetHandler) => html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit=${commnetHandler}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>
`

export const detailsView = async (ctx) => {

    let data = await get(`http://localhost:3030/data/games/${ctx.params.id}`)
    let commentEl = await get(`http://localhost:3030/data/comments?where=gameId%3D%22${ctx.params.id}%22`)


    ctx.render(detailsTemplate(data, commentEl, isOwner, deleteHadler, isLoged,commnetHandler));

    function isOwner(album) {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user._id == album._ownerId) {
            return true
        } else {
            return false
        }
    };

    function isLoged() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return true
        } else {
            return false
        }
    }


    async function deleteHadler(e) {
        e.preventDefault()
        //let user = JSON.parse(localStorage.getItem('user'));
        // let token = user.accessToken
        let result = confirm("Are you sure you want to delete?")
        if (result) {
            let data = await del(`http://localhost:3030/data/games/${e.target.id}`);
            ctx.page.redirect('/');
        }

    }

    async function commnetHandler(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let comment = formData.get('comment');
        if(!comment){
            alert('errorrrr')
            return
        }
        let gameId = ctx.params.id;
        await post(`http://localhost:3030/data/comments`,{gameId,comment})
        e.target.reset();
        ctx.page.redirect(`/details/${gameId}`)
    }
    

};
