import { post } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"


const registerTemplate = () => html`<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit="${registerHandler}">
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>
</div>`

const root = document.getElementById('root');


export const registerView = (ctx) => {
    
    render(registerTemplate(), root);
}

async function registerHandler(e){
    e.preventDefault();

    let {email,password} = Object.fromEntries(new FormData(e.currentTarget));
    let user = await post('http://localhost:3030/users/register',{email,password});
    localStorage.setItem('user',JSON.stringify(user));
    page.redirect('/catalog')
}