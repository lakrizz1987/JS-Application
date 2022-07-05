export async function fetchNewRecord(e) {
    e.preventDefault();


    let form = new FormData(e.target);
    let title = form.get('edit-title');
    let author = form.get('edit-author');

    try {
        if (title == '' || author == '') {
            throw new Error('All fields are required!')
        }
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${localStorage.getItem('id')}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, title })
        })
        if (response.ok == false) {
            let errData = await response.json();
            throw new Error(errData.message);
        }
        document.getElementById('create').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.querySelector('#loadBooks').click()
        e.target.reset()
    } catch (err) {
        alert(err.message);
    }

}