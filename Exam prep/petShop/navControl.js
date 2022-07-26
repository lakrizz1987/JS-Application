export const navView = (ctx, next) => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.querySelector('span.user').style.display = 'inline-block';
        document.querySelector('span.guest').style.display = 'none';
    } else {
        document.querySelector('span.user').style.display = 'none';
        document.querySelector('span.guest').style.display = 'inline-block';
    }
    next();
};