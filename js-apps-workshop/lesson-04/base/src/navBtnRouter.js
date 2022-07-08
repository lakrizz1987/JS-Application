export function navButtonsRouter() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        Array.from(document.querySelectorAll('.guest')).forEach(btn => btn.style.display = 'none');
        Array.from(document.querySelectorAll('.user')).forEach(btn => btn.style.display = 'inline-block');
    } else {
        Array.from(document.querySelectorAll('.guest')).forEach(btn => btn.style.display = 'inline-block');
        Array.from(document.querySelectorAll('.user')).forEach(btn => btn.style.display = 'none');
    }
};