let sectionRegister = document.getElementById('registerPage');

export function showRegister(section){
    section.replaceChildren(sectionRegister);
}