function hideAll() {
    document.querySelectorAll('.view-section').forEach(x => x.style.display = 'none');
}
hideAll()

import { showContent, showHomePage, showLoginPage, showRegisterPage, showAddMovieForm } from './controlPageView.js'
import { login } from './login.js';

let objPages = {
    '/': showHomePage,
    '/login': showLoginPage,
    '/register': showRegisterPage

}

document.querySelector('#main-nav').addEventListener('click', (e) => {
    e.preventDefault();
    const element = e.target;
    if (element.tagName == 'A' && element.textContent != 'Welcome') {
        let mark = element.getAttribute("href");
        hideAll();
        let view = objPages[mark];
        showContent(view())
    }

})

showContent(showHomePage());



document.querySelector('.btn-warning').addEventListener('click', showAddMovieForm)
document.getElementById('login-form').addEventListener('submit',login)

