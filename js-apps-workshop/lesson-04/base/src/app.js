import { createCatalog } from "./catalog.js";
import { navButtonsRouter } from "./navBtnRouter.js";
import { router } from "./router.js";

navButtonsRouter();
createCatalog();

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

navButtonsRouter()