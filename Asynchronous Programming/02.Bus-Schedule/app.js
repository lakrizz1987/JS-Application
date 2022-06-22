function solve() {
    const infoElement = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = { next: 'depot' };

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        try {
            let response = await fetch(url);
            if (response.status != 200) {
                throw new Error('Error');
            }

            let data = await response.json();
            stop = data;
            infoElement.textContent = `Next stop ${stop.name}`;
            arriveBtn.disabled = false;
            departBtn.disabled = true;
        } catch (error) {
            infoElement.textContent = `${error.message}`
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }


    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();