async function getInfo() {
    const id = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const ulElement = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

    try {

        let response = await fetch(url);
        if (response.ok == false) {
            throw new Error('Error');
        }
        let data = await response.json();
        
        stopName.innerHTML = '';
        ulElement.innerHTML = '';

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(bus => {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            ulElement.appendChild(liElement);
        })

    } catch {
        stopName.innerHTML = '';
        ulElement.innerHTML = '';
        stopName.textContent = 'Error'
    }


}