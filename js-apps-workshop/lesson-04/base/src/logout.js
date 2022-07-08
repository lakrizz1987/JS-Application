export function logoutView() {
    localStorage.clear()
    Array.from(document.querySelectorAll('section')).forEach(x => x.style.display = 'none')
    document.querySelector('#catalog').style.display = 'block';
}