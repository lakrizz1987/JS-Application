function loadCommits() {
    // Try it with Fetch API
    let username = document.getElementById('username').value;
    let repository = document.getElementById('repo').value;

    let url = `https://api.github.com/repos/${username}/${repository}/commits`;
    let ulElement = document.getElementById('commits');

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status} Not Found!`)
            }
            return res.json();
        })
        .then(dataHandler)
        .catch(errorHandler)

    function dataHandler(data) {
        ulElement.innerHTML = '';
        for (const row of data) {
            let li = document.createElement('li');
            li.textContent = `${row.commit.author.name}: ${row.commit.message}`
            ulElement.appendChild(li)
        }

    }

    function errorHandler(err) {
        ulElement.innerHTML = '';
        let li = document.createElement('li');
        li.textContent = `${err.message}`
        ulElement.appendChild(li);
    }
}