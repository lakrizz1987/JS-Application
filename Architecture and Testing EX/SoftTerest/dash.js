let sectionDash = document.getElementById('dashboard-holder');

export function showDashboard(section){
    section.replaceChildren(sectionDash);
}