

let options = { day: 'numeric', month: 'long', year: 'numeric' };

const searchBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn")
const weatherDetails = document.getElementById("weatherDetails")
const weatherLocation = document.querySelector(".city")
const humidity = document.querySelector(".humidity")
const windSpeed = document.querySelector(".wind")
const weatherImg = document.querySelector(".weather-img")
const weatherTemp = document.querySelector(".weather-temp")
const sunrise = document.querySelector(".sunrise")
const sunset = document.querySelector(".sunset")
const rainSituation = document.querySelector(".rain-situation")
const dateInfo = document.querySelector(".date")

// api parameter
let key = '3dcb5314017a1078e75cb6fa9ca9b1bb'
let URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="



async function weatherInfo(city) {
    try{
        let res = await axios.get(URL + city + `&appid=${key}`);
        let data = res.data;

        // if(searchBox.value === ''){
        //     document.getElementById("error").innerHTML = 'Please enter your city name'
        // }
        if(res.status === 200){
            weatherDetails.style.display = 'block';
            weatherTemp.innerHTML = Math.round(data.main.temp) +"°C";
            rainSituation.innerHTML = data.weather[0].description
            weatherLocation.innerHTML = `${data.name}, ${data.sys.country}`;
            dateInfo.innerHTML = new Date(data.dt*1000).toLocaleDateString('en-US', options);
            humidity.innerHTML = data.main.humidity + '%'
            windSpeed.innerHTML = data.wind.speed + 'km/h'
            sunrise.innerHTML = `Sunrise ${new Date(data.sys.sunrise*1000).toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric'})}`
            sunset.innerHTML = `Sunset ${new Date(data.sys.sunset*1000).toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric'})}`
        }

        if(data.weather[0].main === "Drizzle"){
            weatherImg.src='/images/drizzle.png'

        }
        else if(data.weather[0].main === "Rain"){
            weatherImg.src='/images/rain.png'

        }
        else if(data.weather[0].main === "Clear"){
            weatherImg.src='/images/clear.png'

        }
        else if(data.weather[0].main === "Mist"){
            weatherImg.src='/images/mist.png'

        }
        else if(data.weather[0].main === "Snow"){
            weatherImg.src='/images/snow.png'

        }
        else if(data.weather[0].main === "Clouds"){
            weatherImg.src='/images/clouds.png'

        }

    }
    catch (e) {
        console.log(e)
        document.getElementById("error").innerHTML = 'Invalid city name';
        document.getElementById("error").style.display = "block";
        weatherDetails.style.display = 'none'

        setTimeout(()=>{
            document.getElementById("error").style.display = "none";
        },1000)
    }
}

weatherInfo("Dhaka");

// Trigger search when 'Enter' key is pressed in the search input
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        weatherInfo(searchBox.value);
        searchBox.value = ''
    }
});

// Trigger search when search button is clicked
searchButton.addEventListener('click', () => {
    weatherInfo(searchBox.value);
    searchBox.value = ''
});


// oop

class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        // Selectors
        this.searchBox = document.getElementById("searchInput");
        this.searchButton = document.getElementById("searchBtn");
        this.weatherDetails = document.getElementById("weatherDetails");
        this.weatherLocation = document.querySelector(".city");
        this.humidity = document.querySelector(".humidity");
        this.windSpeed = document.querySelector(".wind");
        this.weatherImg = document.querySelector(".weather-img");
        this.weatherTemp = document.querySelector(".weather-temp");
        this.sunrise = document.querySelector(".sunrise");
        this.sunset = document.querySelector(".sunset");
        this.rainSituation = document.querySelector(".rain-situation");
        this.dateInfo = document.querySelector(".date");
        this.errorDisplay = document.getElementById("error");

        // Date options
        this.dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };

        // Event Listeners
        this.addEventListeners();
    }

    // Method to fetch weather data
    async fetchWeather(city) {
        try {
            let res = await axios.get(this.URL + city + `&appid=${this.apiKey}`);
            let data = res.data;
            this.displayWeather(data);
        } catch (error) {
            console.log(error);
            this.displayError();
        }
    }

    // Method to display weather details
    displayWeather(data) {
        this.errorDisplay.style.display = 'none'; // Hide error if it was displayed

        this.weatherDetails.style.display = 'block';
        this.weatherTemp.innerHTML = Math.round(data.main.temp) + "°C";
        this.rainSituation.innerHTML = data.weather[0].description;
        this.weatherLocation.innerHTML = `${data.name}, ${data.sys.country}`;
        this.dateInfo.innerHTML = new Date(data.dt * 1000).toLocaleDateString('en-US', this.dateOptions);
        this.humidity.innerHTML = data.main.humidity + '%';
        this.windSpeed.innerHTML = data.wind.speed + 'km/h';
        this.sunrise.innerHTML = `Sunrise ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
        this.sunset.innerHTML = `Sunset ${new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;

        // Set weather image based on weather condition
        this.setWeatherImage(data.weather[0].main);
    }

    // Method to set weather image
    setWeatherImage(weatherCondition) {
        switch (weatherCondition) {
            case "Drizzle":
                this.weatherImg.src = '/images/drizzle.png';
                break;
            case "Rain":
                this.weatherImg.src = '/images/rain.png';
                break;
            case "Clear":
                this.weatherImg.src = '/images/clear.png';
                break;
            case "Mist":
                this.weatherImg.src = '/images/mist.png';
                break;
            case "Snow":
                this.weatherImg.src = '/images/snow.png';
                break;
            case "Clouds":
                this.weatherImg.src = '/images/clouds.png';
                break;
            default:
                this.weatherImg.src = '/images/default.png'; // Fallback image
                break;
        }
    }

    // Method to display error
    displayError() {
        this.weatherDetails.style.display = 'none';
        this.errorDisplay.style.display = 'block';
    }

    // Method to add event listeners
    addEventListeners() {
        // Event listener for 'Enter' key in search input
        this.searchBox.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.fetchWeather(this.searchBox.value);
            }
        });

        // Event listener for search button click
        this.searchButton.addEventListener('click', () => {
            this.fetchWeather(this.searchBox.value);
        });
    }
}

// Initialize the app
const weatherApp = new WeatherApp('3dcb5314017a1078e75cb6fa9ca9b1bb');
