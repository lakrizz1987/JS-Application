import { del, get, post } from "./api.js";
import { html, nothing } from "./node_modules/lit-html/lit-html.js";

const detailsTemplate = (item,isOwner,deleteHadler,isLoged,points,pointsHandler) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${item.imageUrl} alt="example1" />
          <p id="details-title">${item.title}</p>
          <p id="details-category">
            Category: <span id="categories">${item.category}</span>
          </p>
          <p id="details-salary">
            Salary: <span id="salary-number">${item.salary}</span>
          </p>
          <div id="info-wrapper">
            <div id="details-description">
              <h4>Description</h4>
              <span>${item.description}</span>
            </div>
            <div id="details-requirements">
              <h4>Requirements</h4>
              <span>${item.requirements}</span>
            </div>
          </div>
          <p>Applications: <strong id="applications">${points}</strong></p>

          <!--Edit and Delete are only for creator-->
         
          <div id="action-buttons">
          ${isOwner(item) ? html` <a href=${`/edit/${item._id}`} id="edit-btn">Edit</a>
            <a data-id=${item._id} href="javascript:void(0)" @click=${deleteHadler} id="delete-btn">Delete</a>` : nothing }
           

            <!--Bonus - Only for logged-in users ( not authors )-->
            ${(isLoged() && !isOwner(item)) ? html`<a @click=${pointsHandler} href="javascript:void(0)" id="apply-btn">Apply</a>` : nothing}
            
          </div>
        </div>
      </section>
`

export const detailsView = async (ctx) => {

    let data = await get(`http://localhost:3030/data/offers/${ctx.params.id}`)
    let points = await get(`http://localhost:3030/data/applications?where=offerId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`)
    ctx.render(detailsTemplate(data,isOwner,deleteHadler,isLoged,points,pointsHandler));

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
            let data = await del(`http://localhost:3030/data/offers/${e.target.dataset.id}`);
            ctx.page.redirect('/dashboard');
        }

    }

    async function pointsHandler(e) {
        let offerId = ctx.params.id
        await post('http://localhost:3030/data/applications',{offerId});
        e.target.style.display = 'none'
        ctx.page.redirect(`/details/${offerId}`);
    }    

};