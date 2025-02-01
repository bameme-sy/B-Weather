const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const weatherDIV = document.getElementById("weather");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = input.value.trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=786357c2f6750d1047835cd0efdc5f95&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ville introuvable ou problème de connexion.');
            }
            return response.json();
        })
        .then(data => {
            const weather = {
                city: data.name,
                description: data.weather[0].description,
                temperature: data.main.temp,
                feels_like: data.main.feels_like, // Température ressentie
                humidity: data.main.humidity,
                icon: data.weather[0].icon,
            };
            displayWeather(weather);
        })
        .catch(error => {
            weatherDIV.innerHTML = `
                <div style="
                    color: #FF0000;
                    background: rgba(255, 0, 0, 0.1);
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;">
                    Erreur : ${error.message}. Veuillez vérifier le nom de la ville !
                </div>`;
        });
});


function displayWeather(weather) {
    weatherDIV.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('weather-card');

    // Applique un arrière-plan dynamique selon la météo
    const weatherBackgrounds = {
        Clear: 'linear-gradient(to right,rgb(194, 251, 202), #a6c1ee)',
        Clouds: 'linear-gradient(to right, #bdc3c7, #2c3e50)',
        Rain: 'linear-gradient(to right, #00c6ff, #0072ff)',
        Snow: 'linear-gradient(to right, #83a4d4, #b6fbff)',
        Thunderstorm: 'linear-gradient(to right, #000428, #004e92)',
    };

    const background =
        weatherBackgrounds[weather.description] || 'linear-gradient(to right, #83a4d4, #b6fbff)';
    card.style.background = background;

    const title = document.createElement('h2');
    title.textContent = weather.city;
    card.appendChild(title);

    const icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/wn/${weather.icon}.png`;
    card.appendChild(icon);

    const description = document.createElement('p');
    description.textContent = weather.description;
    card.appendChild(description);

    const temperature = document.createElement('p');
    temperature.textContent = `Température : ${weather.temperature} °C`;
    card.appendChild(temperature);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidité : ${weather.humidity}%`;
    card.appendChild(humidity);

    // Ajouter un bouton pour rafraîchir la météo
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Rafraîchir';
    refreshButton.style.marginTop = '15px';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.backgroundColor = '#007BFF';
    refreshButton.style.color = '#fff';
    refreshButton.style.border = 'none';
    refreshButton.style.borderRadius = '5px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
    });
    card.appendChild(refreshButton);

    weatherDIV.appendChild(card);
    weatherDIV.style.display = 'block';
}

