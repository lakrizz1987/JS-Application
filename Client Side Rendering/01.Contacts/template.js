import { html } from "./node_modules/lit-html/lit-html.js";

export function contactCard(contacts) {
    let template = html`${contacts.map((contact) => html`<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn" @click=${showDetails}>Details</button>
        <div class="details" id="1">
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
    </div>
</div>`)}`

    return template;
};

function showDetails(e) {
    let parent = e.target.parentNode
    let div = parent.querySelector('div.details');

    if (div.id == 1) {
        div.style.display = 'block';
        div.id = '2';
    } else {
        div.style.display = 'none';
        div.id = '1';
    };

};

