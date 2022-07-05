export async function createBook(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    let title = form.get('title');
    let author = form.get('author');

    try {
        if (title == '' || author == '') {
            throw new Error('All fields are required!')
        }
        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, title })
        })
        if (response.ok == false) {
            let errData = await response.json();
            throw new Error(errData.message);
        }

    } catch (err) {
        alert(err.message);
    }
}