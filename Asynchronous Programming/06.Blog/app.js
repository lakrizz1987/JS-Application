function attachEvents() {
    let loadBtnElement = document.getElementById('btnLoadPosts');
    let viewBtnElement = document.getElementById('btnViewPost');

    let selectElement = document.getElementById('posts');

    loadBtnElement.addEventListener('click', loadPosts);

    async function loadPosts() {
        let response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let data = await response.json();
        Object.keys(data).forEach(key => {
            let option = create('option', `${data[key].title}`, selectElement);
            option.value = `${key}`;
        })
    }

    



    function create(type, content, parent) {
        let element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (parent) {
            parent.appendChild(element)
        }

        return element;
    }
}

attachEvents();