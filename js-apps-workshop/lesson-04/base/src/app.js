import { router } from "./router.js";

navButtonsRouter();
let sections = document.querySelectorAll('section');
document.querySelector('#catalog').style.display = 'block';
const navigation = document.querySelector('nav');

navigation.addEventListener('click', (e) => {
    e.preventDefault();
    hideSections();

    if (e.target.tagName == "A") {
        let url = new URL(e.target.href);
        router(url.pathname)
        navButtonsRouter()
        Array.from(navigation.querySelectorAll('a')).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
    }
});

function hideSections() {
    Array.from(sections).forEach(x => x.style.display = 'none')
};

function navButtonsRouter() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        Array.from(document.querySelectorAll('.guest')).forEach(btn => btn.style.display = 'none');
        Array.from(document.querySelectorAll('.user')).forEach(btn => btn.style.display = 'inline-block');
    } else {
        Array.from(document.querySelectorAll('.guest')).forEach(btn => btn.style.display = 'inline-block');
        Array.from(document.querySelectorAll('.user')).forEach(btn => btn.style.display = 'none');
    }
};