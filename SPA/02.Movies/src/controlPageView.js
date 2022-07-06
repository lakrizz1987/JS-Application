function showContent(section) {
    section.style.display = 'block';
}

function showHomePage() {
    let page = document.getElementById('home-page');
    return page;
}

function showLoginPage() {
    let page = document.getElementById('form-login');
    return page;
}

function showRegisterPage() {
    let page = document.getElementById('form-sign-up');
    return page;
}

function showAddMovieForm(e){
    e.preventDefault();
    document.getElementById('add-movie').style.display = 'block';
}

export {
    showContent,
    showHomePage,
    showLoginPage,
    showRegisterPage,
    showAddMovieForm
}