function loadRepos() {
	let user = document.getElementById('username').value;
	const url = `https://api.github.com/users/${user}/repos`;
	let ulElement = document.getElementById('repos');

	fetch(url)
		.then(res => {
			console.log(res)
			if (res.ok == false) {
				throw new Error(`${res.status} Not Found`)
			}
			return res.json();
		})
		.then(dataHandler)
		.catch(errorHandler);


	function dataHandler(data) {
		ulElement.innerHTML = '';

		for (const repo of data) {
			let liElement = document.createElement('li');
			liElement.innerHTML = `<a href="${repo.html_url}">
			${repo.full_name}
		</a>`;
			ulElement.appendChild(liElement);
		}
	}

	function errorHandler(err) {
		ulElement.innerHTML = '';
		ulElement.textContent = `${err.message}`;
	}
}