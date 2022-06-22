function attachEvents() {
    let symbols = {
        Sunny: "&#x2600", // ☀
        'Partly sunny': "&#x26C5", // ⛅
        Overcast: "&#x2601", // ☁
        Rain: "&#x2614", // ☂
        Degrees: "&#176"  // °
    }

    let curentWeatherElement = document.getElementById('current');
    let upcomingWeather = document.getElementById('upcoming');

    let btnGet = document.getElementById('submit');

    btnGet.addEventListener('click', async (e) => {


        let location = document.getElementById('location').value;
        let code = '';

        let response = await fetch(' http://localhost:3030/jsonstore/forecaster/locations');
        if (response.status != 200) {
            throw new Error('Error');
        }
        let data = await response.json();
        data.forEach(element => {
            if (element.name == location) {
                code = element.code
            }
        });

        response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
        if (response.status != 200) {
            throw new Error('Error');
        }
        let todayData = await response.json();

        response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
        if (response.status != 200) {
            throw new Error('Error');
        }
        let upcomingData = await response.json();

        curentWeatherElement.innerHTML = '<div class="label">Current conditions</div>';
        upcomingWeather.innerHTML = '<div class="label">Three-day forecast</div>'

        let divForecast = document.createElement('div');
        divForecast.className = 'forecasts';

        let conditionSymbol = document.createElement('span');
        conditionSymbol.className = 'condition symbol';
        conditionSymbol.innerHTML = `${symbols[todayData.forecast.condition]}`
        divForecast.appendChild(conditionSymbol);

        let mainSpan = document.createElement('span');
        mainSpan.className = 'condition';

        let spanName = document.createElement('span');
        spanName.className = 'forecast-data';
        spanName.textContent = `${todayData.name}`;
        mainSpan.appendChild(spanName);

        let degreeSpan = document.createElement('span');
        degreeSpan.className = 'forecast-data';
        degreeSpan.innerHTML = `${todayData.forecast.low}${symbols.Degrees}/${todayData.forecast.high}${symbols.Degrees}`;
        mainSpan.appendChild(degreeSpan);

        let textConditionSpan = document.createElement('span');
        textConditionSpan.className = 'forecast-data';
        textConditionSpan.textContent = `${todayData.forecast.condition}`;
        mainSpan.appendChild(textConditionSpan);

        divForecast.appendChild(mainSpan);
        curentWeatherElement.appendChild(divForecast);


        let divForecastInfo = document.createElement('div');
        divForecastInfo.className = 'forecast-info'

        for (const day of upcomingData.forecast) {
            console.log(day)
            let mainSpan = document.createElement('span');
            mainSpan.className = 'upcoming';

            let symbolSpan = document.createElement('span');
            symbolSpan.className = 'symbol';
            symbolSpan.innerHTML = `${symbols[day.condition]}`;
            mainSpan.appendChild(symbolSpan);

            let dataSpan = document.createElement('span');
            dataSpan.className = 'forecast-data';
            dataSpan.innerHTML = `${day.low}${symbols.Degrees}/${day.high}${symbols.Degrees}`;
            mainSpan.appendChild(dataSpan);

            let condSpan = document.createElement('span');
            condSpan.className = 'forecast-data';
            condSpan.textContent = `${day.condition}`;
            mainSpan.appendChild(condSpan);
            divForecastInfo.appendChild(mainSpan);
        }

        upcomingWeather.appendChild(divForecastInfo);
    })


}

attachEvents();