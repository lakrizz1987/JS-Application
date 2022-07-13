import { navContorl } from "./navControl.js";

let sectionHome = document.getElementById('homePage');

export function showHome(section){
    section.replaceChildren(sectionHome);
    navContorl()
}