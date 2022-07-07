import { loadAllMovies } from "./loadAllMovies.js";

function showContent(section) {
    section.style.display = 'block';
}

function showHomePage() {
    if (localStorage.user == null) {
        document.getElementById('welcome-msg').textContent = 'Welcome';
        document.querySelectorAll('li.user').forEach(x => x.style.display = 'none');
        document.getElementById('addMovieA').style.display = 'none'
    } else {
        let user = JSON.parse(localStorage.user)
        document.getElementById('welcome-msg').textContent = `Welcome,${user.email}`;
        document.querySelectorAll('li.guest').forEach(x => x.style.display = 'none');
        document.getElementById('addMovieA').style.display = 'block'
    }
    let page = document.getElementById('home-page');
    loadAllMovies()
    
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

export function navView(){
    if (localStorage.user == null) {
        document.getElementById('welcome-msg').textContent = 'Welcome';
        document.querySelectorAll('li.user').forEach(x => x.style.display = 'none');
        document.getElementById('addMovieA').style.display = 'none'
    } else {
        let user = JSON.parse(localStorage.user)
        document.getElementById('welcome-msg').textContent = `Welcome,${user.email}`;
        document.querySelectorAll('li.guest').forEach(x => x.style.display = 'none');
        document.getElementById('addMovieA').style.display = 'block'
    }
}

export {
    showContent,
    showHomePage,
    showLoginPage,
    showRegisterPage,
    showAddMovieForm,
    
}