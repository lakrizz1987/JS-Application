import { html, nothing } from "../node_modules/lit-html/lit-html.js";
import { get } from "../src/api.js";

const detailsTemplate = (book,isOwner) => html`
     <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${isOwner(book) ? html`
                    <a class="button" href="#">Edit</a>
                    <a class="button" href="#">Delete</a> `
                    :nothing
                    }
                    

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <a class="button" href="#">Like</a>
                    
                    

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`
export const detailsView = async (ctx) => {
    
    let data = await get(`http://localhost:3030/data/books/${ctx.params.id}`)
    
    ctx.render(detailsTemplate(data,isOwner));
    
    function isOwner(album) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id == album._ownerId) {
            return true
        } else {
            return false
        }
    };
  
};
