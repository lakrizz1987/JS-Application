let sectionHome = document.getElementById('homePage');

export function showHome(section){
    section.replaceChildren(sectionHome);
}