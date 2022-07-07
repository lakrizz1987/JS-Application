export async function loadAllMovies(e) {
    let response = await fetch('http://localhost:3030/data/movies');
    let data = await response.json();
    let container = document.querySelector('#movie div.card-deck');

    Object.values(data).forEach(movie => {
        let div = document.createElement('div');
        div.className = 'card mb-4';
        div.innerHTML = `
        <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
                    <div class="card-body">
                        <h4 class="card-title">${movie.title}</h4>
                    </div>
                    <div class="card-footer">
                        <a href="#/details/6lOxMFSMkML09wux6sAF">
                            <button type="button" class="btn btn-info" id="${movie._id}">Details</button>
                        </a>
                    </div>
        `
        container.appendChild(div);
    })
}