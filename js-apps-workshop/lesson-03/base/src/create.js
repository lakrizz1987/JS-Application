window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', createRecipe);
})

async function createRecipe(ev) {
    ev.preventDefault();

    let url = 'http://localhost:3030/data/recipes/';
    let form = new FormData(ev.target);

    let name = form.get('name');
    let img = form.get('img');
    let ingredients = form.get('ingredients');
    let steps = form.get('steps');

    try {
        if (name == '' || img == '' || ingredients == '' || steps == '') {
            throw new Error('All feelds are require');
        }

        let res = await fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': localStorage.token
            },
            body: JSON.stringify({ name, img ,ingredients,steps})
        })

        let data = await res.json();
        let id = data._id;

        

    } catch (err) {
        alert(err.mesage)
    }
}